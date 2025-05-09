import { Provider, cacheExchange, createClient, fetchExchange } from 'urql'

const client = createClient({
  url: '/gql',
  exchanges: [cacheExchange, fetchExchange],
})

export const Urql = ({ children }: { children: React.ReactNode }) => (
  <Provider value={client}>{children}</Provider>
)
