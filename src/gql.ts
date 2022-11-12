import { gql, useQuery } from 'urql'
import { Search } from './types/Search'
import { Movie } from './types/Movie'
import { Show } from './types/Show'
import { Person } from './types/Person'
import { Season } from './types/Season'
import { Episode } from './types/Episode'

export function useSearchQuery(variables: { query: string; page: string }) {
    return useQuery<{ search: Search }>({
        query: gql`
            query ($query: String, $page: String) {
                search(query: $query, page: $page)
            }
        `,
        variables
    })
}

export function useMovieQuery(variables: { id: String }) {
    return useQuery<{ movie: Movie }>({
        query: gql`
            query ($id: ID) {
                movie(id: $id)
            }
        `,
        variables
    })
}

export function useShowQuery(variables: { id: string }) {
    return useQuery<{ show: Show }>({
        query: gql`
            query ($id: ID) {
                show(id: $id)
            }
        `,
        variables
    })
}

export function usePersonQuery(variables: { id: string }) {
    return useQuery<{ person: Person }>({
        query: gql`
            query ($id: ID) {
                person(id: $id)
            }
        `,
        variables
    })
}

export function useSeasonQuery(variables: {
    id?: string
    season_number?: string
}) {
    return useQuery<{ season: Season }>({
        query: gql`
            query ($id: ID, $season_number: String) {
                season(id: $id, season_number: $season_number)
            }
        `,
        variables
    })
}

export function useEpisodeQuery(variables: {
    id?: string
    season_number?: string
    episode_number?: String
}) {
    return useQuery<{ episode: Episode }>({
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
