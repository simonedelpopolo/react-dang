import { process_exit } from './react-dang__.js'
import reactDang from '../react-dang.js'
import { help, install, version } from '../../index.js'

/**
 * @type {symbol}
 */
export const commandSymbol = Symbol( 'a function that handles the command checking' )
export const command = Object.defineProperty( reactDang, commandSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,
    
    /**
     * Description.
     *
     * @param {string []} command_ - The command name.
     * @param {object} flags - The parsed flags.
     * @returns {{} | Promise<void>}
     */
    value: async function command( command_, flags ){
        
        switch ( command_ ){
            
            case 'help': {
                
                await help( undefined, undefined )
                process.exit( 0 )
                break
            }
            
            case 'v':
            case 'version':
                
                process.stdout.write( `${version}\n` )
                process.exit( 0 )
                break
            
            case 'i':
            case 'install': {
                
                await install( flags )
    
                break
            }
            
            default: {
                await process_exit( `command -> \`${command_}\` not available`, Error( 'rd-CommandError' ), 3 )
            }
        }
    
    }
} )
