import {
    install_author_flag__,
    install_bare_flag__,
    install_command__,
    install_description_flag__,
    install_git_flag__,
    install_license_flag__,
    install_name_flag__,
    install_version_flag__,
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
 * Object [ input.install_command ].
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

/**
 * Object [ input.install_git_flag ].
 *
 * - --git flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<Error|undefined>|Error|undefined}
 */
export async function install_git_flag( options ){
    return install_git_flag__( options )
}

/**
 * Object [ input.install_version_flag ].
 *
 * - version_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function install_version_flag( options ){
    return install_version_flag__( options )
}

/**
 * Object [ input.install_author_flag ].
 *
 * - author_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function install_author_flag( options ){
    return install_author_flag__( options )
}

/**
 * Object [ input.install_description_flag ].
 *
 * - description_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function install_description_flag( options ){
    return install_description_flag__( options )
}

/**
 * Object [ input.install_license_flag ].
 *
 * - license_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function install_license_flag( options ){
    return install_license_flag__( options )
}

/**
 * Object [ input.install_name_flag ].
 *
 * - name_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function install_name_flag( options ){
    return install_name_flag__( options )
}
