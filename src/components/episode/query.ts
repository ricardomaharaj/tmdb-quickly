import { TypedDocumentNode, useQuery } from 'urql'
import { Episode, TV } from '~/types/tmdb'

type Data = {
  tv?: TV
  episode?: Episode
}

type Vars = {
  id: string
  season_number: number
  episode_number: number
  query?: string
  page?: number
}

export function useEpisodeQuery(gqlQuery: TypedDocumentNode, variables: Vars) {
  return useQuery<Data, Vars>({
    query: gqlQuery,
    variables: variables,
  })
}
