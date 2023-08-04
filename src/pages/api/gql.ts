import { readFileSync } from 'fs'
import { createSchema, createYoga } from 'graphql-yoga'
import { tmdbResolvers } from '~/server/util/tmdb'

const schema = createSchema({
  typeDefs: readFileSync('./gql/schema.gql').toString('utf-8'),
  resolvers: { Query: { ...tmdbResolvers } },
})

const yoga = createYoga({
  schema,
  graphiql: true,
  graphqlEndpoint: '/api/gql',
})

export default yoga
