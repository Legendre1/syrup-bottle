import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
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

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}