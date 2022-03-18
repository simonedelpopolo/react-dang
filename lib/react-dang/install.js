import { constants } from 'node:fs'
import { finished_text } from './install/text/finished.js'
import { parse } from 'json-swiss-knife'
import { random_properties } from './install/functions/random_properties.js'
import react_dang from '../react-dang.js'
import { spawn } from 'child_process'
import { access, cp, mkdir, readFile, rename, rm, writeFile } from 'fs/promises'
import { bare, bare_flag_events } from './install/functions/bare.js'
import { process_exit, shell_exit_codes } from '../../index.js'

/**
 * @type {symbol}
 */
const installSymbol = Symbol( 'Object [ react-dang.install ]' )
const install = Object.defineProperty( react_dang, installSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,

    /**
     * Object [ react-dang.install ].
     *
     * @param {object} options - given options.
     * @returns {Promise<void> | void}
     */
    value: async function install( options ){

        let rename_back = false

        if( options.bare === false ){
            const package_json_exists = await access( './package.json', constants.F_OK ).catch( error => error )

            if( !( package_json_exists instanceof Error ) ) {
                await rename( './package.json', './_package.json' )
                    .catch( error => process_exit( error.message, Error( 'Object [react-dang.install] copy @react-dang/app' ), shell_exit_codes.internal ) )
                rename_back = true
            }
        }

        bare_flag_events.on( 'choice', async answer => {

            if( answer === true ) await generating()
        } )

        if( options.bare === true )
            await bare()
        else
            await generating()

        /**
         * Initialize a basic react-dang project.
         *
         * @returns {Promise<void>}
         */
        async function generating(){

            /**
             * - generating random project directory
             * - use flag --bare to use the current directory as project root directory. this will overwrite your package.json if any.
             *
             * @type {string}
             */
            let dir = options.bare === true ? '' : `/${await random_properties( 'cwd' )}`

            const working_dir = `${ process.cwd() }${dir}`

            if( options.bare === false ) {

                /**
                 * - making project directory.
                 * - use flag --bare to use the current directory as project root directory. this will overwrite your package.json if any.
                 */
                await mkdir( working_dir ).catch( async error => {
                    await process_exit( error.message, new Error( 'Object [react-dang.install] mkdir `working_dir`' ), shell_exit_codes.internal )
                } )
            }

            const npmInstallReactDangApp = spawn( 'npm', [
                'install',
                '--silent',
                '@react-dang/app',
            ], {
                cwd: `${ process.cwd() }/${dir}`,
                stdio: [
                    'ignore',
                    process.stdout,
                    process.stderr,
                ],
            } )

            npmInstallReactDangApp.on( 'exit', async code => {

                if ( code !== 0 )
                    process.exit( 1 )

                await cp(
                    `${process.cwd() }${dir}/node_modules/@react-dang/app`,
                    working_dir,
                    {
                        force: true,
                        recursive: true,
                    } )
                    .catch( async error => process_exit( error.message, Error( 'Object [react-dang.install] copy @react-dang/app' ), shell_exit_codes.internal ) )

                const removeDangApp = spawn( 'npm', [
                    'remove',
                    '--silent',
                    '@react-dang/app',
                ], {
                    cwd: `${ process.cwd() }${dir}`,
                    stdio: [
                        'ignore',
                        process.stdout,
                        process.stderr,
                    ],
                } )

                removeDangApp.on( 'exit', async code => {
                    if ( code !== 0 )
                        process.exit( 1 )

                    await rm( `${process.cwd() }${dir}/node_modules/@react-dang`, {
                        force: true,
                        recursive:true
                    } )

                    console.log( 'removed @react-dang\r'.green() )

                    const install = spawn( 'npm', [
                        'install',
                        '--silent'
                    ], {
                        cwd: working_dir,
                        stdio: [
                            'ignore',
                            process.stdout,
                            process.stderr,
                        ],
                    } )

                    install.on( 'exit', async code => {

                        if ( code !== 0 )
                            process.exit( 1 )

                        let buffer = await readFile( `${working_dir}/package.json` )
                            .catch( async error => process_exit( error.message, Error( 'Object [react-dang.install] readFile package.json' ), shell_exit_codes.internal ) )

                        let package_json = await parse( buffer )
                            .catch( async error => process_exit( error.message, Error( 'Object [react-dang.install] parse package.json' ), shell_exit_codes.internal ) )

                        package_json[ 'name' ] = options.name || await random_properties( 'name' )
                        package_json[ 'description' ] = options.description || await random_properties( 'description' )
                        package_json[ 'version' ] = options.version || '0.0.1'
                        package_json[ 'author' ] = options.author || await random_properties( 'author' )
                        package_json[ 'license' ] = options.license || 'Apache-2.0'
                        package_json.type = 'module'

                        await writeFile( `${working_dir}/package.json`, JSON.stringify( package_json ) )
                            .catch( async error => process_exit( error.message, Error( 'Object [react-dang.install] writeFile package.json' ), shell_exit_codes.internal ) )

                        /**
                         * Check if git is available in host OS.
                         *
                         * @type {ChildProcessWithoutNullStreams}
                         */
                        if( options.git ) {
                            const spawn_git_available = spawn( 'type', [
                                '-p',
                                'git',
                            ] )
                            spawn_git_available.on( 'exit', async code => {
                                if ( code !== 0 ) {
                                    console.warn( 'git not available on host OS'.bg_blue()
                                        .color( 255 ), new ReferenceError( 'Object [react-dang.install] not-satisfied-error' ), shell_exit_codes.commands )
                                }else{

                                    const git = spawn( 'git', [
                                        'init',
                                    ], {
                                        cwd: working_dir,
                                        stdio: [
                                            'ignore',
                                            process.stdout,
                                            process.stderr,
                                        ],
                                    } )

                                    git.on( 'exit', async code => {
                                        if( code !== 0 ) {
                                            console.warn( `git exited with code ➡ ${code}`.bg_blue()
                                                .color( 255 ), new ReferenceError( 'Object [react-dang.install] not-satisfied-error' ), shell_exit_codes.commands )
                                        }else
                                            console.log( 'git init successful\r'.green() )

                                        console.log( finished_text( options.bare, options.git, working_dir ) )

                                        if( options.bare === false ) {
                                            if ( rename_back ) {
                                                await rename( './_package.json', './package.json' )
                                                    .catch( error => process_exit( error.message, Error( 'Object [react-dang.install] copy @react-dang/app' ), shell_exit_codes.internal ) )
                                            }
                                        }
                                    } )
                                }
                            } )
                        }
                    } )
                } )
            } )
        }
    }
} )

export default install[ installSymbol ]
