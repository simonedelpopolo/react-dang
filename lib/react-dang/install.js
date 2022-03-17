import { parse } from 'json-swiss-knife'
import { random_properties } from './install/functions/random_properties.js'
import react_dang from '../react-dang.js'
import { spawn } from 'child_process'
import { bare, bare_flag_events } from './install/functions/bare.js'
import { cp, mkdir, readFile, rm, writeFile } from 'fs/promises'
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
                    await process_exit( error.message, new Error( 'Object [react-dang.install] mkdir `working_dir`' ), shell_exit_codes.commands )
                } )
            }


            const npmInstallReactDangApp = spawn( 'npm', [
                'install',
                '--silent',
                '@react-dang/app',
            ], {
                cwd: working_dir,
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
                    './node_modules/@react-dang/app',
                    working_dir,
                    {
                        force: true,
                        recursive: true,
                    } )
                    .catch( async error => {
                        await process_exit( error.message, Error( 'Object [react-dang.install] copy @react-dang/app' ), 125 )
                    } )

                const removeDangApp = spawn( 'npm', [
                    'remove',
                    '--silent',
                    '@react-dang/app',
                ], {
                    cwd: working_dir,
                    stdio: [
                        'ignore',
                        process.stdout,
                        process.stderr,
                    ],
                } )

                removeDangApp.on( 'exit', async code => {
                    if ( code !== 0 )
                        process.exit( 1 )

                    await rm( './node_modules/@react-dang/app', {
                        force: true,
                        recursive:true
                    } )

                    process.stdout.write( '\x1b[32m removed @react-dang \x1b[0m \r' )

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

                        let package_json = await parse(
                            await readFile( `${working_dir}/package.json` )
                                .catch( async error => {
                                    await process_exit( error.message, Error( 'Object [react-dang.install] readFile package.json' ), 125 )
                                } )
                        )

                        package_json[ 'name' ] = options.name || await random_properties( 'name' )
                        package_json[ 'description' ] = options.description || await random_properties( 'description' )
                        package_json[ 'version' ] = options.version || '0.0.1'
                        package_json[ 'author' ] = options.author || await random_properties( 'author' )
                        package_json[ 'license' ] = options.license || 'Apache-2.0'
                        package_json.type = 'module'

                        await writeFile( `${working_dir}/package.json`, JSON.stringify( package_json ) )
                            .then( () => {
                                console.log( '\x1b[32m react-dang ready to go \x1b[0m' )
                                if( options.bare === false )
                                    console.log( `\x1b[32m "cd ${working_dir}" \x1b[0m` )
                                console.log( '\x1b[32m "npm run build-dev" in one terminal \x1b[0m' )
                                console.log( '\x1b[32m "npm run webpack-serve-dev" in another terminal \x1b[0m' )
                                console.log( '\x1b[32m "open browser to http://localhost:3000" \x1b[0m' )
                            } )
                            .catch( async error => {
                                await process_exit( error.message, Error( 'rd-WritePackageInstallError' ), 125 )
                            } )
                    } )
                } )
            } )
        }
    }
} )

export default install[ installSymbol ]
