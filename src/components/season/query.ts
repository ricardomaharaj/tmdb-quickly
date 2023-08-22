import { TypedDocumentNode, useQuery } from 'urql'
import { Season, TV } from '~/types/tmdb'

type Data = {
  season?: Season
  tv?: TV
}

type Vars = {
  id: string
  season_number: number
  query?: string
  page?: number
}

export function useSeasonQuery(query: TypedDocumentNode, variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}
