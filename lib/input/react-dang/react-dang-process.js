import { command_error } from './text/errors.js'
import { default as process_title } from '../process_title.js'
import { install_author_flag, install_bare_flag, install_command, install_description_flag, install_git_flag, install_license_flag, install_name_flag, install_version_flag } from '../../../input.js'
import { process_exit, shell_exit_codes } from '../../../index.js'

const react_dang_processSymbol = Symbol( 'Object [ input.process_title.react_dang_process ]' )
const react_dang_process = Object.defineProperty( process_title, react_dang_processSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * ReactDang process.
     *
     * @param {object} process_parsed_argv - process.argv parsed.
     * @returns {Promise<Object<any>>}
     */
    value: async function react_dang_process( process_parsed_argv ) {

        /**
         * - react-dang commands, flags and options
         * - command selector, flags & options initializer.
         *
         * @type {{command: {install: {bare: boolean}}}}
         */
        const react_dang = {
            command: {
                install: {
                    bare: false,
                    git: false,
                    name: false,
                    author: false,
                    description: false,
                    version: false,
                    license: false
                }
            }
        }

        for ( const flag in process_parsed_argv.keys ) {

            switch ( process_parsed_argv.keys[ flag ] ) {

                case 'install': {

                    await install_command(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
                        .catch( error => process_exit( error.message, Error( `${ process.title } commands-error` ), shell_exit_codes.commands ) )

                    delete process_parsed_argv.object.install
                    process_parsed_argv.keys.splice( 0, 1 )

                    const installFlags = Object.keys( process_parsed_argv.object )

                    for ( const flag in installFlags ) {

                        switch ( installFlags[ flag ] ) {

                            case 'bare':

                                react_dang.command.install.bare = await install_bare_flag(
                                    process_parsed_argv.object[ installFlags[ flag ] ]
                                )
                                    .catch( async error => {
                                        await process_exit( 'flag --bare doesn\'t accept any argument', error, shell_exit_codes.flags )
                                    } )

                                delete process_parsed_argv.object[ installFlags[ flag ] ]
                                process_parsed_argv.keys.splice( 0, 1 )

                                continue

                            case 'git':

                                react_dang.command.install.git = await install_git_flag(
                                    process_parsed_argv.object[ installFlags[ flag ] ]
                                )
                                    .catch( async error => {
                                        await process_exit( 'flag --git doesn\'t accept any argument', error, shell_exit_codes.flags )
                                    } )

                                delete process_parsed_argv.object[ installFlags[ flag ] ]
                                process_parsed_argv.keys.splice( 0, 1 )

                                continue

                            case 'version':

                                react_dang.command.install.version = await install_version_flag(
                                    process_parsed_argv.object[ installFlags[ flag ] ]
                                )
                                    .catch( async error => {
                                        await process_exit( `--version flag ${error.message}`, new TypeError( `${process.title} flags-error` ), shell_exit_codes.flags )
                                    } )

                                delete process_parsed_argv.object[ installFlags[ flag ] ]
                                process_parsed_argv.keys.splice( 0, 1 )

                                continue

                            case 'name':

                                react_dang.command.install.name = await install_name_flag(
                                    process_parsed_argv.object[ installFlags[ flag ] ]
                                )
                                    .catch( async error => {
                                        await process_exit( `--name flag ${error.message}`, new TypeError( `${process.title} flags-error` ), shell_exit_codes.flags )
                                    } )

                                delete process_parsed_argv.object[ installFlags[ flag ] ]
                                process_parsed_argv.keys.splice( 0, 1 )

                                continue

                            case 'description':

                                react_dang.command.install.description = await install_description_flag(
                                    process_parsed_argv.object[ installFlags[ flag ] ]
                                )
                                    .catch( async error => {
                                        await process_exit( '--description accept only string.', error, shell_exit_codes.flags )
                                    } )

                                delete process_parsed_argv.object[ installFlags[ flag ] ]
                                process_parsed_argv.keys.splice( 0, 1 )

                                continue

                            case 'author':

                                react_dang.command.install.author = await install_author_flag(
                                    process_parsed_argv.object[ installFlags[ flag ] ]
                                )
                                    .catch( async error => {
                                        await process_exit( '--author accept only string.', error, shell_exit_codes.flags )
                                    } )

                                delete process_parsed_argv.object[ installFlags[ flag ] ]
                                process_parsed_argv.keys.splice( 0, 1 )

                                continue

                            case 'license':

                                react_dang.command.install.license = await install_license_flag(
                                    process_parsed_argv.object[ installFlags[ flag ] ]
                                )
                                    .catch( async error => {
                                        await process_exit( '--license accept only string.', error, shell_exit_codes.flags )
                                    } )
                                delete process_parsed_argv.object[ installFlags[ flag ] ]
                                process_parsed_argv.keys.splice( 0, 1 )

                                break

                            default: {
                                let error = `${'        flag '.bg_red().color( 255 )}\`--${ installFlags[ flag ].color( 255 ).bg_magenta().strong().underline() }\`${' not recognize'.color( 255 ).bg_red()}\n`
                                error += `        run -> ${ process.title } help install        `.color( 255 ).bg_red()
                                await process_exit( error, new TypeError( `${ process.title } flags-error` ), shell_exit_codes.flags )
                            }
                        }
                    }

                }
                    break

                default: {

                    await process_exit( command_error( process_parsed_argv.keys[ flag ] ), new TypeError( `${ process.title } commands-error` ), shell_exit_codes.commands )
                }

            }
        }

        return react_dang
    },
} )

export default react_dang_process[ react_dang_processSymbol ]
