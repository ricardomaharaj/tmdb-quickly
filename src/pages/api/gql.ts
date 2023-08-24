import { createSchema, createYoga } from 'graphql-yoga'
import { tmdbResolvers } from '~/server/gql/resolvers'
import { typeDefs } from '~/server/gql/schema'

const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: { Query: { ...tmdbResolvers } },
})

const yoga = createYoga({
  schema: schema,
  graphiql: true,
  graphqlEndpoint: '/api/gql',
})

export default yoga
