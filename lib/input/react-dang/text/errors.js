/**
 * Error text for commands not recognized.
 *
 * @param {string} command - the error command name.
 * @returns {string}
 */
export function command_error( command ){
    return `      command \`${ command.color( 255 ).bg_magenta().strong().underline() }\`  not recognize
      run -> ${ process.title.bg_green().color( 255 ).strong() } help
`
}
