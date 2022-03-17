import { createRequire } from 'module'
import reactDang from '../../react-dang.js'
import { undefined_ } from 'oftypes'

const require = createRequire( import.meta.url )
export const { version } = require( '../../../package.json' )

/**
 * @type {symbol}
 */
export const helpSymbol = Symbol( 'react-dang async function help( command, flag ):void' )
export const help = Object.defineProperty( reactDang, helpSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,

    /**
     * Get help for the usage of react-dang.
     *
     * @param {string=} command - The command to get help for.
     * @param {string=} flag - The flag to get help for.
     */
    value: async function help_( command, flag ){

        /**
         * The react-dang header message.
         */
        const helpHeader = () => {

            console.info( '    ________________________________________________________________________    ' )
            console.info( `    |\t\t\t\t react-dang v${ version }\t\t   |` )
            console.info( '    ------------------------------------------------------------------------    ' )
            console.info( 'Command line utility to spin-up a react project in seconds.' )
            console.info()

        }

        /**
         * The react-dang commands help.
         */
        const helpCommands = () => {

            console.info()
            console.info( 'available commands:' )
            console.info()
            console.info( '   install [i] \t\t[ install a react-dang application. Default will generate project-name and directory ]' )
            console.info( '\x1b[32m', '      info \t', 'use `react-dang i --replace` to install in the current directory', '\x1b[0m' )
            console.info( '\x1b[32m', '      info \t', '⚠️  this will overwrite the current directory', '\x1b[0m' )
            console.info( '   help [h] \t\t[ shows help about the given command or flag ]' )
            console.info( '\x1b[32m', '      info \t', 'for commands:\t`react-dang help [command-name] ]`', '\x1b[0m' )
            console.info( '\x1b[32m', '       |   \t', 'for flags:\t`react-dang help [--flag-name] ]`', '\x1b[0m' )
            console.info( '   version [v] \t\t[ shows the installed version ]' )
            console.info()

        }

        /**
         * The d64 flags help.
         */
        const helpFlags = () => {

            console.info()
            console.info( 'available flags', '\x1b[32m', '\x1b[0m', ':' )
            console.info()
            console.info( '  --name [-n] <string> \t\t[ set the project name. ]' )
            console.info( '  --directory [-d] <string>\t[ set the project directory where @react-dat/app will be instantiated. ]' )
            console.info( '  --replace [-r] <null> \t[ it will instantiate @react-dang/app in the current working directory. ]' )
            console.info( '\x1b[32m', '       info \t', '⚠️  this will overwrite the current directory.', '\x1b[0m' )
            console.info()

        }

        if ( await undefined_( command ) === true && await undefined_( flag ) === true ) {

            helpHeader()
            helpCommands()
            helpFlags()

        }
    }
} )
