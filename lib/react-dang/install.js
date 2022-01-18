import { parse } from 'json-swiss-knife'
import reactDang from '../react-dang.js'
import { spawn } from 'child_process'
import { undefined_ } from 'oftypes'
import { cp, mkdir, readFile, rm, writeFile } from 'fs/promises'
import { process_exit, reactDang__ } from './react-dang__.js'

/**
 * @type {symbol}
 */
export const installSymbol = Symbol( 'a function that handles the installation @react-dang/app' )
export const install = Object.defineProperty( reactDang, installSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,
    
    /**
     * The installation @react-dang/app.
     *
     * @param {object} options - .
     * @returns {Promise<void>}
     */
    value: async function install( options ){
    
        const npmInstallReactDangApp = await spawn( 'npm', [
            'install',
            '--silent',
            '@react-dang/app',
        ], {
            stdio: [
                'ignore',
                process.stdout,
                process.stderr,
            ],
        } )
    
        npmInstallReactDangApp.on( 'exit', async code => {
        
            if ( code !== 0 )
                process.exit( 1 )
            
            let  projectName
            if( await undefined_( options.n ) === true && await undefined_( options.name ) === true ) {
                const adjectives = Math.floor( Math.random() * reactDang__.project_name.adjectives.length -1 )
                const nouns = Math.floor( Math.random() * reactDang__.project_name.nouns.length -1 )
                const projectID = Math.floor( Math.random() * 1024 )
                projectName = `${ reactDang__.project_name.adjectives[ adjectives ] }_${ reactDang__.project_name.nouns[ nouns ]}.${projectID}`
            }
            else
                projectName = `${options.n || options.name}`
        
            let installDirectory
            if( await undefined_( options.d ) === true && await undefined_( options.directory ) === true )
                installDirectory = projectName
            else
                installDirectory = `${options.d || options.directory}`
            
            await mkdir( installDirectory ).catch( async error => {
                await process_exit( error.message, Error( 'rd-MkdirInstallError' ), 125 )
            } )
            
            await cp(
                './node_modules/@react-dang/app/',
                `./${installDirectory}`,
                {
                    force: true,
                    recursive: true,
                } )
                .catch( async error => {
                    await process_exit( error.message, Error( 'rd-CopyInstallError' ), 125 )
                } )
        
            const removeDangApp = spawn( 'npm', [
                'remove',
                '--silent',
                '@react-dang/app',
            ], {
                stdio: [
                    'ignore',
                    process.stdout,
                    process.stderr,
                ],
            } )
        
            removeDangApp.on( 'exit', async code => {
                if ( code !== 0 )
                    process.exit( 1 )
            
                await rm( './node_modules/@react-dang', {
                    force: true,
                    recursive:true
                } )
            
                process.stdout.write( '\x1b[32m removed @react-dang \x1b[0m \r' )
            
                const install = spawn( 'npm', [
                    'install',
                    '--silent'
                ], {
                    cwd: `./${installDirectory}`,
                    stdio: [
                        'ignore',
                        process.stdout,
                        process.stderr,
                    ],
                } )
            
                install.on( 'exit', async code => {
                    if ( code !== 0 )
                        process.exit( 1 )
                
                    const packages = await parse(
                        await readFile( `./${installDirectory}/package.json` )
                            .catch( async error => {
                                await process_exit( error.message, Error( 'rd-ReadPackageInstallError' ), 125 )
                            } )
                    )
                
                    packages.name = projectName
                    await writeFile( `./${installDirectory}/package.json`, JSON.stringify( packages ) )
                        .then( () => {
                            console.log( '\x1b[32m react-dang ready to go \x1b[0m' )
                            console.log( `\x1b[32m "cd ${installDirectory}" \x1b[0m` )
                            console.log( '\x1b[32m "npm run build-dev" in one terminal \x1b[0m' )
                            console.log( '\x1b[32m "npm run serve-dev" in another terminal \x1b[0m' )
                            console.log( '\x1b[32m "open browser to http://localhost:3000" \x1b[0m' )
                        } )
                        .catch( async error => {
                            await process_exit( error.message, Error( 'rd-WritePackageInstallError' ), 125 )
                        } )
                } )
            } )
        } )
    }
} )
