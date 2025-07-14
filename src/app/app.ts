import { AddressInfo } from 'node:net'

import { logger } from '@puni/server/logger/logger'
import fastify from 'fastify'
export const app = fastify({
  logger: false
})

app.addHook('onListen', function () {
  const address = app.server.address() as AddressInfo
  const host = address.family === 'IPv6'
    ? `[${address.address}]`
    : address.address
  logger.info(`启动地址: http://${host}:${address.port}`)
})

app.addHook('onResponse', async (request, reply) => {
  logger.info(`${request.method} | ${request.url} | ${request.ip} | ${reply.statusCode} | ${reply.elapsedTime.toFixed(2)}ms`)
})
