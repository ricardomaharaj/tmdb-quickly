import { ReactNode } from 'react'
import { Provider, cacheExchange, createClient, fetchExchange } from 'urql'

const client = createClient({
  url: '/api/gql',
  exchanges: [cacheExchange, fetchExchange],
})

export const Urql = (props: { children: ReactNode }) => (
  <Provider value={client}>{props.children}</Provider>
)
