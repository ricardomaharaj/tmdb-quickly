import { TypedDocumentNode, useQuery } from 'urql'
import { TV } from '~/types/tmdb'

type Data = {
  tv?: TV
}

type Vars = {
  id: string
  query?: string
  page?: number
}

export function useTVQuery(query: TypedDocumentNode, variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}
