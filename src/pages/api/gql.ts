import { readFileSync } from 'fs'
import { createSchema, createYoga } from 'graphql-yoga'
import { TMDB } from '~/server/tmdb'

const schema = createSchema({
  typeDefs: readFileSync('./gql/schema.gql').toString('utf-8'),
  resolvers: { Query: { ...TMDB } },
})

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/gql',
})

export default yoga
