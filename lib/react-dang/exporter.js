import { reactDang__ } from './react-dang__.js'
import { command, commandSymbol } from './command.js'
import { entryPoint, entryPointSymbol } from './entry-point.js'
import { flags, flagsSymbol } from './flags.js'
import { help, helpSymbol, version } from './help.js'
import { install, installSymbol } from './install.js'

export const process_exit__ = reactDang__.process_exit
export const stderr__ = reactDang__.stderr

export const command__ = command[ commandSymbol ]
export const entryPoint__ = entryPoint[ entryPointSymbol ]
export const flags__ = flags[ flagsSymbol ]
export const install__ = install[ installSymbol ]
export const help__ = help[ helpSymbol ]
export const version__ = version
