import {
    command as c, commandSymbol,
    entryPoint, entryPointSymbol,
    flagsSymbol, flags as fs,
    help as h, helpSymbol,
    install as i, installSymbol,
    version as v
} from './lib/react-dang/exporter.js'


/**
 * The flags checking function.
 *
 * @param {string[]} args - The given arguments array.
 * @returns {string[]|Promise}
 */
export function flags( args ){
    return fs[ flagsSymbol ]( args )
}

/**
 * The command checking function.
 *
 * @param {string []} command_ - The command name.
 * @param {object} flags - The parsed flags.
 * @returns {{} | Promise<void>}
 */
export function command( command_, flags ){
    return c[ commandSymbol ]( command_, flags )
}

/**
 * Get help for the usage of react-dang.
 *
 * @param {string=} command - The command to get help for.
 * @param {string=} flag - The flag to get help for.
 * @returns {Promise<void>}
 */
export async function help( command, flag ){
    return h[ helpSymbol ]( command, flag )
}

/**
 * The installation function.
 *
 * @param {object} options - .
 * @returns {Promise<void>}
 */
export async function install( options ){
    return i[ installSymbol ]( options )
}

/**
 * ReactDang entry point function.
 * Shortened ad rd.
 *
 * @returns {Promise<*>}
 */
export async function rd( ){
    return entryPoint[ entryPointSymbol ]()
}

export const version = v
