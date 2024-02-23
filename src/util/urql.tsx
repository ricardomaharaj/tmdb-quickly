import { cacheExchange, createClient, fetchExchange, Provider } from 'urql'

const client = createClient({
  url: 'http://localhost:4000/',
  exchanges: [cacheExchange, fetchExchange],
})

export const Urql = ({ children }: { children?: React.ReactNode }) => (
  <Provider value={client}>{children}</Provider>
)
