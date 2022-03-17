import {
    install_bare_flag__,
    install_command__,
    react_dang_process__,
} from './lib/exporter.js'

/**
 * Koorie process.
 *
 * @param {object} process_parsed_argv - process.argv parsed.
 * @returns {Promise<Object<any>>}
 */
export async function react_dang_process( process_parsed_argv ) {
    return react_dang_process__( process_parsed_argv )
}

/**
 * The react-dang install command doesn't accept any options.
 *
 * @param {any} options - if any options is given just exits.
 * @returns {Promise<Error|undefined>| Error|undefined}
 */
export async function install_command( options ) {
    return install_command__( options )
}

/**
 * Object [ input.install_bare_flag ].
 *
 * - --bare flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<Error|undefined>|Error|undefined}
 */
export async function install_bare_flag( options ){
    return install_bare_flag__( options )
}
