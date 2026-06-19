import { ReactNode } from "preact/compat"
import { cacheExchange, createClient, fetchExchange, Provider } from "urql"

const client = createClient({
	url: "/gql",
	exchanges: [cacheExchange, fetchExchange],
	preferGetMethod: false,
})

export const Urql = ({ children }: { children: ReactNode }) => (
	<Provider value={client}>{children}</Provider>
)
