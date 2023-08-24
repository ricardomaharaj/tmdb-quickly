import fs from 'node:fs'

export const typeDefs = fs.readFileSync('./gql/schema.gql').toString('utf8')
