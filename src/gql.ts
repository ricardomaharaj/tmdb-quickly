import { gql, useQuery } from '@apollo/client'
import { Search } from './types/Search'
import { Movie } from './types/Movie'
import { Show } from './types/Show'
import { Person } from './types/Person'
import { Season } from './types/Season'
import { Episode } from './types/Episode'

interface SearchQueryRes {
    search: Search
}
interface SearchQueryVars {
    query: string
    page: string
}
export function useSearchQuery(variables: SearchQueryVars) {
    return useQuery<SearchQueryRes, SearchQueryVars>(
        gql`
            query ($query: String, $page: String) {
                search(query: $query, page: $page)
            }
        `,
        { variables }
    )
}

interface MovieQueryRes {
    movie: Movie
}
interface MovieQueryVars {
    id?: string
}
export function useMovieQuery(variables: MovieQueryVars) {
    return useQuery<MovieQueryRes, MovieQueryVars>(
        gql`
            query ($id: ID) {
                movie(id: $id)
            }
        `,
        { variables }
    )
}

interface ShowQueryRes {
    show: Show
}
interface ShowQueryVars {
    id?: string
}
export function useShowQuery(variables: ShowQueryVars) {
    return useQuery<ShowQueryRes, ShowQueryVars>(
        gql`
            query ($id: ID) {
                show(id: $id)
            }
        `,
        { variables }
    )
}

interface PersonQueryRes {
    person: Person
}
interface PersonQueryVars {
    id?: string
}
export function usePersonQuery(variables: PersonQueryVars) {
    return useQuery<PersonQueryRes, PersonQueryVars>(
        gql`
            query ($id: ID) {
                person(id: $id)
            }
        `,
        { variables }
    )
}

interface SeasonQueryRes {
    season: Season
}
interface SeasonQueryVars {
    id?: string
    season_number?: string
}
export function useSeasonQuery(variables: SeasonQueryVars) {
    return useQuery<SeasonQueryRes, SeasonQueryVars>(
        gql`
            query ($id: ID, $season_number: String) {
                season(id: $id, season_number: $season_number)
            }
        `,
        { variables }
    )
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
    return useQuery<EpisodeQueryRes, EpisodeQueryVars>(
        gql`
            query ($id: ID, $season_number: String, $episode_number: String) {
                episode(
                    id: $id
                    season_number: $season_number
                    episode_number: $episode_number
                )
            }
        `,
        { variables }
    )
}
