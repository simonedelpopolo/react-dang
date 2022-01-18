import * as ReactDang from '../react-dang.js'
import { command as c, commandSymbol as cs } from './command.js'
import { entryPoint as ep, entryPointSymbol as ep_s } from './entry-point.js'
import { flags as f, flagsSymbol as fs } from './flags.js'
import { install as i, installSymbol as is } from './install.js'
// eslint-disable-next-line sort-imports
import { help as h, helpSymbol as hs, version as v } from './help.js'

const rd = ReactDang
export default rd

export const command = c
export const commandSymbol = cs

export const entryPoint = ep
export const entryPointSymbol = ep_s

export const flags = f
export const flagsSymbol = fs

export const install = i
export const installSymbol = is

export const help = h
export const helpSymbol = hs
export const version = v
