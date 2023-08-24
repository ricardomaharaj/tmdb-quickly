import { TypedDocumentNode, useQuery } from 'urql'
import { Movie } from '~/types/tmdb'

type Data = {
  movie?: Movie
}

type Vars = {
  id: string
  query?: string
  page?: number
}

export function useMovieQuery(query: TypedDocumentNode, variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}
