import path from 'path'
import { fileURLToPath } from 'url'

/** 当前文件的绝对路径 */
const filename = fileURLToPath(import.meta.url)

/** Puni根目录 */
export const serverPathRoot = Object.freeze(path.join(filename, '../..').replace(/\\/g, '/'))
