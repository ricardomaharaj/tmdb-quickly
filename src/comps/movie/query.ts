import type { TypedDocumentNode } from 'urql'
import { useQuery } from 'urql'
import type { Movie } from '~/types/tmdb'

type Vars = {
  id?: string
  query?: string
  page?: number
}

type Args = {
  query: TypedDocumentNode
  variables: Vars
}

type Data = {
  movie?: Movie
}

export function useMovieQuery(args: Args) {
  const { query, variables } = args
  return useQuery<Data, Vars>({ query, variables })
}
