/**
 * Text to be shown once installation has fined.
 *
 * @param {boolean} bare - bare option
 * @param {boolean} git - bare option
 * @param {string} directory - working dir
 * @returns {string}
 */
export function finished_text( bare, git, directory ){
    const cd_dir = bare === false ? `${'cd '.blue()}${directory}` : 'already in the project root directory.'
    const git_init = git === true ? 'git repository initialized' : 'git repository not initialized.'

    return `
${'# react-dang ready to go'.magenta().underline().strong()}

  ${cd_dir}
  
  ${git_init}
  
  ${'npm '.blue()}${'run '.red()}${'build-prod'}
  
  ${'## open another terminal ⇩'.magenta().underline().strong()}
  ${'npm '.blue()}${'run '.red()}${'koorie'}
`
}
