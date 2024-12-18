import Fastify from 'fastify'
import cors from '@fastify/cors'
import fs from 'fs';
import { indexedPuzzles } from './indexed-puzzles.js';

const fastify = Fastify({
  logger: true
})

await fastify.register(cors, {
    origin: '*'
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
    url: '/indexed-puzzle',
    schema: {
      querystring: {
        type: 'object',
        properties: {
            index: { type: 'number'}
        },
        required: ['index'],
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
        let puzzlePath = `./puzzles/${indexedPuzzles[request.query.index]}.json`;
        const data = fs.readFileSync(puzzlePath, { encoding: 'utf8', flag: 'r' });
        return data;
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