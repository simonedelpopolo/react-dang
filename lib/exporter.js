/**
 * JSDoc typedef
 *
 * @global
 */
/**
 * Represents an async function.
 *
 * @typedef {Function} AsyncFunction
 */

/**
 * Extends
 *
 * @private
 */

/**
 * A set of conversion utilities
 */
await import( './extends/String/conversion/toBuffer.js' )
await import( './extends/String/conversion/toNumber.js' )
/**
 * - stdout text decoration
 */
await import( './extends/String/decoration/strong.js' )
await import( './extends/String/decoration/underline.js' )
/**
 * - stdout text colors
 */
await import( './extends/String/color/fg/color.js' )
await import( './extends/String/color/fg/black.js' )
await import( './extends/String/color/fg/blue.js' )
await import( './extends/String/color/fg/cyan.js' )
await import( './extends/String/color/fg/green.js' )
await import( './extends/String/color/fg/magenta.js' )
await import( './extends/String/color/fg/red.js' )
await import( './extends/String/color/fg/white.js' )
await import( './extends/String/color/fg/yellow.js' )
/**
 * - stdout background colors
 */
await import( './extends/String/color/bg/color.js' )
await import( './extends/String/color/bg/black.js' )
await import( './extends/String/color/bg/blue.js' )
await import( './extends/String/color/bg/cyan.js' )
await import( './extends/String/color/bg/green.js' )
await import( './extends/String/color/bg/magenta.js' )
await import( './extends/String/color/bg/red.js' )
await import( './extends/String/color/bg/white.js' )
await import( './extends/String/color/bg/yellow.js' )

/**
 * Object [ activity ]
 *
 * @private
 */
export { default as exit__ } from './activity/exit.js'
export { default as stderr__ } from './activity/stderr.js'
export { default as exit_types__ } from './activity/exit/types.js'

/**
 * Object [ errors ]
 *
 * @private
 */
export { default as shell_exit_codes__ } from './errors/shell.js'

/**
 * Object [ input ]
 *
 * @private
 */
export { default as processor__ } from './input/processor.js'
export { default as entry_point__ } from './input/entry_point.js'
export { default as options__ } from './input/options.js'
export { default as process_title__ } from './input/process_title.js'
export { default as react_dang_process__ } from './input/react-dang/react-dang-process.js'

/**
 * Object [ react-dang ]
 */
export { default as install__ } from './react-dang/install.js'

/**
 * - react-dang commands and flags.
 *
 * @private
 */
export { default as install_command__ } from './input/react-dang/install_command.js'
export { default as install_bare_flag__ } from './input/react-dang/install_bare_flag.js'
export { default as install_git_flag__ } from './input/react-dang/install_git_flag.js'
export { default as install_version_flag__ } from './input/react-dang/install_version_flag.js'
export { default as install_description_flag__ } from './input/react-dang/install_description_flag.js'
export { default as install_author_flag__ } from './input/react-dang/install_author_flag.js'
export { default as install_name_flag__ } from './input/react-dang/install_name_flag.js'
export { default as install_license_flag__ } from './input/react-dang/install_license_flag.js'
