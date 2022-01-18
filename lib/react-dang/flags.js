import reactDang from '../react-dang.js'
import { process_exit, reactDang__ } from './react-dang__.js'

/**
 * @type {symbol}
 */
export const flagsSymbol = Symbol( 'a function that handles the flags checking' )
export const flags = Object.defineProperty( reactDang, flagsSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,
    
    /**
     * Description.
     *
     * @param {string []} args - .
     * @returns {{} | Promise<void>}
     */
    value: async function flags( args ){
    
        const regExpression = /\s*[^-\s](?![-])[.?]*[=]*[.?]*\S*/g
        const argumentsString = args.join( ' ' )
        
        let flagsArray = []
        const matches = Array.from( argumentsString.matchAll( regExpression ), matches => matches[ 0 ] )
        for ( const index in matches )
            flagsArray.push( matches[ index ].replaceAll( '-', '_' ).split( '=' ) )
        
        const flagsObject = Object.fromEntries( flagsArray )
        const flagsObjectKeys = Object.keys( flagsObject )
        
        for ( const flag in flagsObjectKeys ){
            
            switch ( flagsObjectKeys[ flag ] ) {
        
                case 'n':
                case 'name':
            
                    continue
    
                case 'd':
                case 'directory':
                    
                    break
        
                default:
                    await process_exit( `${flagsObjectKeys[ flag ]} not available`, Error( 'rd-Flags-Error' ), 4 )
            }
        }
        
        
        return flagsObject
    }
} )
