import Fastify from 'fastify'
import cors from '@fastify/cors'
import fs from 'fs';
import { indexedPuzzles } from './indexed-puzzles.js';
import { getPuzzleForDay } from './puzzle-schedule.js';

const fastify = Fastify({
  logger: true
})

const loadPuzzleByPath = ((path) => {
  let puzzlePath = `./puzzles/${path}.json`;
  const data = fs.readFileSync(puzzlePath, { encoding: 'utf8', flag: 'r' });
  return data;
});

await fastify.register(cors, {
    origin: '*'
  })


fastify.route({
    method: 'GET',
    url: '/daily-puzzle',
    schema: {
      querystring: {
        type: 'object',

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

      console.log('getting daily puzzle');

      const now = new Date(); 
      console.log("now is " + now);
      const timestamp = now.getTime();
      const puzzleIndex = getPuzzleForDay(timestamp);

      return loadPuzzleByPath(indexedPuzzles[puzzleIndex])
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
        return loadPuzzleByPath(indexedPuzzles[request.query.index])
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
        return loadPuzzleByPath(request.query.name)
    }
  })

try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}