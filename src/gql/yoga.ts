import { createYoga } from "graphql-yoga"
import { schema } from "./schema"

const gqlEndpoint = "/gql"

export const yoga = createYoga({
	schema: schema,
	graphqlEndpoint: gqlEndpoint,
	graphiql: false,
	landingPage: false,
})
