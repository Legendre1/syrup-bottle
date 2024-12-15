import Fastify from 'fastify'
import cors from '@fastify/cors'
import fs from 'fs';

const fastify = Fastify({
  logger: true
})

await fastify.register(cors, {
    origin: '*'
  })

fastify.route({
  method: 'GET',
  url: '/health-check',
  schema: {
    querystring: {
      type: 'object',
      properties: {
          name: { type: 'string'}
      },
      required: ['name'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          healthy: { type: 'boolean' }
        }
      }
    }
  },
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return { healthy: true }
  }
})

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

fastify.route({
    method: 'GET',
    url: '/daily-puzzle',
    schema: {
      querystring: {
        type: 'object',
        properties: {
            name: { type: 'string'}
        },
        required: ['name'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    },
    preHandler: async (request, reply) => {
      // E.g. check authentication
    },
    handler: async (request, reply) => {
      return { hello: 'daily puzzle from ec2!' }
    }
  })

  fastify.route({
    method: 'GET',
    url: '/puzzle',
    schema: {
      querystring: {
        type: 'object',
        properties: {
            name: { type: 'string'}
        },
        required: ['name'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            puzzle: { }
          }
        }
      }
    },
    preHandler: async (request, reply) => {
      // E.g. check authentication
    },
    handler: async (request, reply) => {
        console.log("request = ", request.query.name)
        console.log("Loading json on server...")
        let puzzlePath = `./puzzles/${request.query.name}.json`;
        const data = fs.readFileSync(puzzlePath, { encoding: 'utf8', flag: 'r' });
        return data;
    }
  })

try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}