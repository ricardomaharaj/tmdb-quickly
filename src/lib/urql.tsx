import { ReactNode } from 'preact/compat'
import { Provider, cacheExchange, createClient, fetchExchange } from 'urql'
import { env } from '~/env'

const client = createClient({
  url: env.VITE_API_URL,
  exchanges: [cacheExchange, fetchExchange],
})

export const Urql = ({ children }: { children: ReactNode }) => (
  <Provider value={client}>{children}</Provider>
)
