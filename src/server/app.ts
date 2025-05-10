import { yoga } from './gql/yoga'

Bun.serve({ fetch: yoga, port: 4000 })
console.log('http://localhost:4000/gql')
