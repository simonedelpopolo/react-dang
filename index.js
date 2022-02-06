import {
    command__,
    entryPoint__,
    flags__,
    help__,
    install__,
    process_exit__,
    stderr__,
    version__,
} from './lib/react-dang/exporter.js'

export const process_exit = process_exit__

/**
 * Wrap to process.stderr.write.
 *
 * @param {string|any} message - The message to the stderr.
 */
export function stderr( message ){
    return stderr__( message )
}

/**
 * The command checking function.
 *
 * @param {string []} command_ - The command name.
 * @param {object} flags - The parsed flags.
 * @returns {{} | Promise<void>}
 */
export function command( command_, flags ){
    return command__( command_, flags )
}

/**
 * ReactDang entry point function.
 * Shortened ad rd.
 *
 * @returns {Promise<*>}
 */
export async function rd( ){
    return entryPoint__()
}

/**
 * The flags checking function.
 *
 * @param {string[]} args - The given arguments array.
 * @returns {string[]|Promise}
 */
export function flags( args ){
    return flags__( args )
}

/**
 * Get help for the usage of react-dang.
 *
 * @param {string=} command - The command to get help for.
 * @param {string=} flag - The flag to get help for.
 * @returns {Promise<void>}
 */
export async function help( command, flag ){
    return help__( command, flag )
}

/**
 * The installation function.
 *
 * @param {object} options - .
 * @returns {Promise<void>}
 */
export async function install( options ){
    return install__( options )
}

export const version = version__
