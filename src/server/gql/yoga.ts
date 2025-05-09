import { useResponseCache as responseCache } from '@graphql-yoga/plugin-response-cache'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema'

const gqlEndpoint = '/gql'

export const yoga = createYoga({
  schema: schema,
  graphqlEndpoint: gqlEndpoint,
  plugins: [responseCache({ session: () => null })],
})
