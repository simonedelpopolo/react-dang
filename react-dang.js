#!/usr/bin/env node
import { entry_point, install } from './index.js'

// - splicing out from `process.argv` the paths for node and shell.js
process.argv.splice( 0, 2 )

// - process.title
process.title = 'react-dang'

const entry_point_run = await entry_point( process.argv )

/**
 *
 * @type {Promise|{command:{
 *     install:{
 *       middleware:string,
 *       name:string,
 *       description:string,
 *       version:string,
 *       author:string,
 *       license:string
 *     }
 * }}}
 */
const react_dang = await entry_point_run

if( typeof react_dang !== 'undefined' && typeof react_dang?.command !== 'undefined' ){
    // eslint-disable-next-line default-case
    switch ( Object.entries( react_dang.command )[ 0 ][ 0 ] ){

        // Switcher for recognized commands no need for default case.
        // Checks have been done at Object [ input.entry_point ]
        case 'install':

            await install( react_dang.command.install )

            break

    }
}


