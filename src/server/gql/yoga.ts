import { useResponseCache as responseCache } from '@graphql-yoga/plugin-response-cache'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema'

export const yoga = createYoga({
  schema: schema,
  graphqlEndpoint: '/api/gql',
  plugins: [
    responseCache({
      session: () => null,
    }),
  ],
})
