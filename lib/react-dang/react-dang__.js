import { number_ } from 'oftypes'
import { stderr } from '../../index.js'

/**
 * The react-dang private functions.
 *
 * @type {{empty_arguments: (function(string[]): Promise<unknown>), write_error: ((function((string|*), string=, number=): Promise<void>)|*), stderr: reactDang__.stderr}}
 * @private
 */
export const reactDang__ = {
    
    /**
     * Some description.
     *
     * @param {string[]} argv - It checks for empty process.argv.
     * @returns {string[] | Promise}
     */
    empty_arguments: ( argv ) => {
        
        return new Promise( ( resolve, reject ) => {
    
            if ( argv.length === 0 )
                reject( 'please try -> npx react-dang install --name=\'project-name\'.' )
            
            resolve( argv )
        } )
    },
    
    /**
     * Wrap to process.stderr.write.
     *
     * @param {string|any} message - The message to the stderr.
     */
    stderr: ( message ) => {
        process.stderr.write( message )
    },
    
    /**
     * Single error thrown to process.stderr.write.
     *
     * @param {string|any} error - Required argument. The message to the stderr.
     * @param {Error=} errorType - Default set to Error('rd-InternalError'). The error type should be: InternalError, TypeError or anything that describes the error.
     * @param {number=} exitCode - Default set to 1, The exit code to send back.
     */
    process_exit: async ( error, errorType = Error( 'rd-InternalError' ), exitCode = 1 ) => {
        
        if(  errorType.name !== 'Error' ){
            const messageReject = '\x1b[41m [rd-TypeError] Only Error is accepted for argument `errorType`.\x1b[0m '
            const errorErrorType = `\n ${messageReject}\n\t Given argument: \x1b[32m{${ typeof errorType }}\x1b[0m -> \x1b[31m ${JSON.stringify( errorType )}\x1b[0m \n\n`
            stderr( `${errorErrorType}` )
            process.exit( 1 )
        }
        
        if( await number_( exitCode ) === false ){
            const messageReject = `\x1b[41m [${errorType}] Only type of number is accepted for argument \`exitCode\`.\x1b[0m `
            const errorExitCode = `\n ${messageReject}\n\t Given argument: \x1b[32m{${ typeof exitCode }}\x1b[0m -> \x1b[31m ${JSON.stringify( exitCode )}\x1b[0m \n\n`
            stderr( `${errorExitCode}` )
            process.exit( 1 )
        }
        
        // The terminal stderr
        stderr( '\n' )
        stderr( `\x1b[41m         ${error}\x1b[0m` )
        stderr( '\n' )
        stderr( '\n' )
        stderr( '          [stacktrace]' )
        stderr( '\n' )
        stderr( `          ${errorType.stack}` )
        stderr( '\n\n' )
        process.exit( exitCode )
    },
    
    project_name : {
        adjectives : [
            'brave',
            'shy',
            'snaky',
            'great',
            'kind',
            'fantastic',
            'venomous'
        ],
        nouns: [
            'hero',
            'heroin',
            'tiger',
            'bird',
            'alien',
        ],
    }
}
