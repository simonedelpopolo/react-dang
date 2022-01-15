#!/usr/bin/env node
import { parse } from 'json-swiss-knife'
import { spawn } from 'child_process'
import { cp, readFile, rm, writeFile } from 'fs/promises'

process.argv.splice( 0, 2 )

if ( process.argv.length === 0 ) {
    process.stderr.write( 'please try -> npx react-dang `project-name`' )
    process.exit( 1 )
}

const npmInstallReactDangApp = spawn( 'npm', [
    'install',
    '@react-dang/app@v0.1.3-alpha',
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
    
    const copy = await cp(
        './node_modules/@react-dang/app/',
        './',
        {
            force: true,
            recursive: true,
        } )
        .catch( error => console.log( error ) )
    
    if ( typeof copy !== 'undefined' )
        process.exit( 1 )
    
    const removeDangApp = spawn( 'npm', [
        'remove',
        '@react-dang/app@v0.1.3-alpha',
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
        
        await rm( './node_modules/@react-dang/app', {
            force: true,
            recursive:true
        } )
        
        console.log( '\x1b[32m removed @react-dang/app \x1b[0m' )
        
        const install = spawn( 'npm', [
            'install',
        ], {
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
                await readFile( './package.json' )
                    .catch( error => {throw error} ),
            )
            
            packages.name = process.argv[ 0 ]
            await writeFile( './package.json', JSON.stringify( packages ) )
                .then( () => {
                    console.log( '\x1b[32m react-dang ready to go \x1b[0m' )
                    console.log( '\x1b[32m "npm run build" in one terminal \x1b[0m' )
                    console.log( '\x1b[32m "npm run serve-dev" in another \x1b[0m' )
                } )
                .catch( error => {throw error} )
    
            
        } )
    } )
} )
