import input from '../../input.js'
import { resolvers, undefined_ } from 'oftypes'

export const install_commandSymbol = Symbol( 'Object [ input.install_command ]' )
export const install_command = Object.defineProperty( input, install_commandSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * The react-dang install command doesn't accept any options.
     *
     * @param {any} options - if any options is given just exits.
     * @returns {Promise<Error|undefined>| Error|undefined}
     */
    value: async function install_command( options ) {

        let command

        const truthy = () => undefined
        const falsy = () => new TypeError( `install doesn't take any argument. Given -> ${ options }` )

        command = ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

        return new Promise( ( resolve, reject ) => {

            if( command instanceof Error )
                reject( command )

            resolve( command )
        } )
    }
} )

export default install_command[ install_commandSymbol ]
