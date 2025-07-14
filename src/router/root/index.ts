/**
 * @description 根路由服务
 */

import fs from 'node:fs'
import path from 'node:path'

import { app } from '@puni/server/app'
import { serverPathRoot } from '@puni/server/root'
import { PING_ROUTE, VERSION_ROUTE } from '@puni/server/router/router'

app.route({
  method: 'GET',
  url: PING_ROUTE,
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.code(200).send({ message: 'pong' })
  }
})

app.route({
  method: 'GET',
  url: VERSION_ROUTE,
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          version: {
            type: 'string'
          }
        }
      }
    }
  },
  handler: async function (request, reply) {
    const file = await fs.promises.readFile(path.join(serverPathRoot, 'package.json'), 'utf-8')
    reply.code(200).send({ version: JSON.parse(file).version })
  }
})
