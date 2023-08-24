export type MovieProps = {
  id: string
  query: string
  page: number
}

export type TVProps = {
  id: string
  query: string
  page: number
}

export type SeasonProps = {
  id: string
  season_number: number
  query: string
  page: number
}

export type EpisodeProps = {
  id: string
  season_number: number
  episode_number: number
  query: string
  page: number
}

export type PersonProps = {
  id: string
  query: string
  page: number
  filter: string
}
