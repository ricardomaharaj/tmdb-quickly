import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { readFileSync } from 'fs'

import { ResolverObject } from '~/types/resolver'
import { tmdbApi } from '~/util/tmdb-api'

const typeDefs = readFileSync('./schema.gql').toString('utf8')

const resolvers: ResolverObject = {
  Query: {
    search: async (_, { query, page }) => {
      if (!query) {
        return await tmdbApi.get('trending/all/week')
      } else {
        return await tmdbApi.get('search/multi', { params: { query, page } })
      }
    },
    movie: async (_, { id }) => {
      return await tmdbApi.get(`movie/${id}`, {
        params: {
          append_to_response: 'credits,images,videos',
        },
      })
    },
    tv: async (_, { id }) => {
      return await tmdbApi.get(`tv/${id}`, {
        params: {
          append_to_response: 'aggregate_credits,images,videos',
        },
      })
    },
    season: async (_, { id, season }) => {
      return await tmdbApi.get(`tv/${id}/season/${season}`, {
        params: {
          append_to_response: 'credits,images,videos',
        },
      })
    },
    episode: async (_, { id, season, episode }) => {
      return await tmdbApi.get(`tv/${id}/season/${season}/episode/${episode}`, {
        params: {
          append_to_response: 'credits,images,videos',
        },
      })
    },
  },
}

const server = new ApolloServer({ resolvers, typeDefs })

export default startServerAndCreateNextHandler(server)
