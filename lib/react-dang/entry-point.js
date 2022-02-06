import reactDang from '../react-dang.js'
import { reactDang__ } from './react-dang__.js'
import { command, flags, process_exit } from '../../index.js'

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
        
        const process_argv = await reactDang__.empty_arguments( process.argv )
            
            .then( process_argv => process_argv[ 0 ] )
            
            .catch( async error => {
                await process_exit( error, new Error( 'rd-EmptyArgumentsError' ), 2 )
            } )
        
        process.argv.splice( 0, 1 )
        await command( process_argv, await flags( process.argv ) )
    }
} )
