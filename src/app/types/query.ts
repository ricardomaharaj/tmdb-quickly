import {
  Movie,
  Person,
  Search,
  TV,
  TVEpisode,
  TVSeason,
} from '~/server/types/gql'

export type Vars = {
  page?: number
  query?: string
  filter?: string

  id?: string

  season_number?: string
  episode_number?: string
}

export type Data = {
  tv?: TV
  tvSeason?: TVSeason
  tvEpisode?: TVEpisode
  movie?: Movie
  person?: Person
  search?: Search
}
