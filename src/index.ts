import { app } from '@puni/server/app'
import { logger } from '@puni/server/logger/logger'

const getRouteCount = () => {
  const routes = app.printRoutes()
  const paths = new Set()

  routes.split('\n').forEach(route => {
    const match = route.match(/^\s*[├└│]\s*──\s*(\/?[^\s(]+)/)
    if (match && match[1]) {
      const fullPath = match[1]
        .replace(/\/{2,}/g, '/')
        .replace(/\/$/, '')
      if (fullPath) paths.add(fullPath)
    }
  })

  return paths.size
}

/** 初始化服务器 */
export const initServer = async (host: string, port: number) => {
  try {
    const now = Date.now()
    logger.info('启动中...')
    logger.info('加载路由中...')
    await import('@puni/server/router')
    logger.info(`加载路由成功, 共加载 ${getRouteCount()} 个路由`)
    await app.listen({
      host,
      port
    })
    logger.info(`启动成功，耗时 ${Date.now() - now}ms`)
    logger.info('https://github.com/PuniCore/server')
  } catch (err) {
    process.exit(1)
  }
}

initServer('127.0.0.1', 3200)
