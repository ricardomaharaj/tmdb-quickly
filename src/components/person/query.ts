import { TypedDocumentNode, useQuery } from 'urql'
import { Person } from '~/types/tmdb'

type Data = {
  person?: Person
}

type Vars = {
  id: string
  query?: string
  page?: number
  filter?: string
}

export function usePersonQuery(gqlQuery: TypedDocumentNode, variables: Vars) {
  return useQuery<Data, Vars>({
    query: gqlQuery,
    variables: variables,
  })
}
