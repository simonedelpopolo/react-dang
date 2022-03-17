#!/usr/bin/env node
import { entry_point } from './index.js'

// - splicing out from `process.argv` the paths for node and shell.js
process.argv.splice( 0, 2 )

// - process.title
process.title = 'react-dang-help'

const entry_point_run = await entry_point( process.argv )

/**
 *
 * @type {Promise|{command:{
 *     help:{
 *          bare: undefined|boolean
 *     }
 * }}}
 */
const react_dang_help = await entry_point_run

if( typeof react_dang_help !== 'undefined' && typeof react_dang_help?.command !== 'undefined' ){
    // eslint-disable-next-line default-case
    switch ( Object.entries( react_dang_help.command )[ 0 ][ 0 ] ){

        // Switcher for recognized commands no need for default case.
        // Checks have been done at Object [ input.entry_point ]
        case 'help':

            // - await help( react_dang_help.command.help )

            break

    }
}
