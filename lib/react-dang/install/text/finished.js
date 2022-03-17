/**
 * Text to be shown once installation has fined.
 *
 * @param {boolean} bare - bare option
 * @param {string} directory - working dir
 * @returns {string}
 */
export function finished_text( bare, directory ){
    const cd_dir = bare === false ? `${'cd '.blue()}${directory}` : 'already in the project root directory.'

    return `
${'# react-dang ready to go'.magenta().underline().strong()}

  ${cd_dir}
  
  ${'npm '.blue()}${'run '.red()}${'build-prod'}
  
  ${'## open another terminal ⇩'.magenta().underline().strong()}
  ${'npm '.blue()}${'run '.red()}${'koorie'}
`
}
