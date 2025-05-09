import { ReactNode } from 'preact/compat'
import { Provider, cacheExchange, createClient, fetchExchange } from 'urql'

const client = createClient({
  url: '/gql',
  exchanges: [cacheExchange, fetchExchange],
})

export const Urql = ({ children }: { children: ReactNode }) => (
  <Provider value={client}>{children}</Provider>
)
