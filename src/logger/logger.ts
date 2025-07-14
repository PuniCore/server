import { createLogger, Logger } from '@punicore/logger'

const serverLogger: Logger = createLogger(
  {
    level: 'info',
    FileLogging: false
  }
)

export const logger = {
  info: (...args: any[]) => serverLogger.info(serverLogger.chalk.cyan('[Server]'), ...args),
  warn: (...args: any[]) => serverLogger.warn(serverLogger.chalk.cyan('[Server]'), ...args),
  error: (...args: any[]) => serverLogger.error(serverLogger.chalk.cyan('[Server]'), ...args)
}
