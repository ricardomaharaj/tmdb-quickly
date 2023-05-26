import { readFileSync } from 'fs'
import { createSchema, createYoga } from 'graphql-yoga'
import { ID } from '~/types/id'
import { Yoga } from '~/types/yoga'
import { TMDB } from '~/util/tmdb-api'

const schema = createSchema<Yoga>({
  typeDefs: readFileSync('./gql/schema.gql').toString('utf-8'),
  resolvers: {
    Query: {
      search: async (_, { query, page }: { query?: string; page: number }) => {
        if (!query) return await TMDB.trending()
        return await TMDB.search({ query, page })
      },
      movie: async (_, { id }: { id: ID }) => {
        return await TMDB.movie({ id })
      },
      tv: async (_, { id }: { id: ID }) => {
        return await TMDB.tv({ id })
      },
      season: async (
        _,
        { id, season_number }: { id: ID; season_number: number },
      ) => {
        return await TMDB.season({ id, season_number })
      },
      episode: async (
        _,
        {
          id,
          season_number,
          episode_number,
        }: { id: ID; season_number: number; episode_number: number },
      ) => {
        return await TMDB.episode({ id, season_number, episode_number })
      },
    },
  },
})

const yoga = createYoga<Yoga>({ schema, graphqlEndpoint: '/api/gql' })

export default yoga
