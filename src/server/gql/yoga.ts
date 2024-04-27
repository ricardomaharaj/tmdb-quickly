import { useResponseCache as responseCache } from '@graphql-yoga/plugin-response-cache'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema'

const gqlEndpoint = '/api/gql'

const isProd = process.env.NODE_ENV === 'production'

export const yoga = createYoga({
  schema: schema,
  graphqlEndpoint: gqlEndpoint,
  graphiql: !isProd,
  plugins: [
    responseCache({
      session: () => null,
    }),
  ],
})
