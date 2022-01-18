import reactDang from '../react-dang.js'
import { command, flags } from '../../index.js'
import { process_exit, reactDang__ } from './react-dang__.js'

/**
 * @type {symbol}
 */
export const entryPointSymbol = Symbol( 'a function that handles the entry point of react-dang' )
export const entryPoint = Object.defineProperty( reactDang, entryPointSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,
    
    /**
     * Entry point of react-dang.
     *
     * @returns {Promise<void>}
     */
    value: async function entryPoint( ){
        
        // If the arguments aren't empty the first argument, if it IS NOT one of the available commands, is assigned to "project-name",
        const process_argv = await reactDang__.empty_arguments( process.argv )
            .then( process_argv => process_argv[ 0 ] )
            .catch( async error => {
                await process_exit( error, new Error( 'rd-EmptyArgumentsError' ), 2 )
                process.exit( 1 )
            } )
        
        process.argv.splice( 0, 1 )
        await command( process_argv, await flags( process.argv ) )
    }
} )
