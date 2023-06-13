import type { TypedDocumentNode } from 'urql'
import { useQuery } from 'urql'
import type { TV } from '~/types/tmdb'

type Data = {
  tv?: TV
}

type Vars = {
  id?: string
  query?: string
  page?: number
}

type Args = {
  query: TypedDocumentNode
  variables: Vars
}

export function useTVQuery(args: Args) {
  const { query, variables } = args
  return useQuery<Data, Vars>({ query, variables })
}
