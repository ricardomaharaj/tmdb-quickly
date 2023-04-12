import { gql, useQuery } from 'urql'
import { Episode } from './types/episode'
import { Movie } from './types/movie'
import { Person } from './types/person'
import { Search } from './types/search'
import { Season } from './types/season'
import { Show } from './types/show'

interface SearchQueryRes {
  search: Search
}
interface SearchQueryVars {
  query: string
  page: string
}
export function useSearchQuery(variables: SearchQueryVars) {
  return useQuery<SearchQueryRes, SearchQueryVars>({
    query: gql`
      query ($query: String, $page: String) {
        search(query: $query, page: $page)
      }
    `,
    variables
  })
}

interface MovieQueryRes {
  movie: Movie
}
interface MovieQueryVars {
  id?: string
}
export function useMovieQuery(variables: MovieQueryVars) {
  return useQuery<MovieQueryRes, MovieQueryVars>({
    query: gql`
      query ($id: ID) {
        movie(id: $id)
      }
    `,
    variables
  })
}

interface ShowQueryRes {
  show: Show
}
interface ShowQueryVars {
  id?: string
}
export function useShowQuery(variables: ShowQueryVars) {
  return useQuery<ShowQueryRes, ShowQueryVars>({
    query: gql`
      query ($id: ID) {
        show(id: $id)
      }
    `,
    variables
  })
}

interface PersonQueryRes {
  person: Person
}
interface PersonQueryVars {
  id?: string
}
export function usePersonQuery(variables: PersonQueryVars) {
  return useQuery<PersonQueryRes, PersonQueryVars>({
    query: gql`
      query ($id: ID) {
        person(id: $id)
      }
    `,
    variables
  })
}

interface SeasonQueryRes {
  season: Season
}
interface SeasonQueryVars {
  id?: string
  season_number?: string
}
export function useSeasonQuery(variables: SeasonQueryVars) {
  return useQuery<SeasonQueryRes, SeasonQueryVars>({
    query: gql`
      query ($id: ID, $season_number: String) {
        season(id: $id, season_number: $season_number)
      }
    `,
    variables
  })
}

interface EpisodeQueryRes {
  episode: Episode
}
interface EpisodeQueryVars {
  id?: string
  season_number?: string
  episode_number?: string
}
export function useEpisodeQuery(variables: EpisodeQueryVars) {
  return useQuery<EpisodeQueryRes, EpisodeQueryVars>({
    query: gql`
      query ($id: ID, $season_number: String, $episode_number: String) {
        episode(
          id: $id
          season_number: $season_number
          episode_number: $episode_number
        )
      }
    `,
    variables
  })
}
