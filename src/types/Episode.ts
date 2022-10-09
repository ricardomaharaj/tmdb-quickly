import { gql, useQuery } from 'urql'

interface Data {
    episode?: Episode
}

interface Episode {
    air_date?: string
    crew?: Crew[]
    episode_number?: number
    guest_stars?: GuestStar[]
    name?: string
    overview?: string
    id?: number
    production_code?: string
    runtime?: number
    season_number?: number
    still_path?: string
    vote_average?: number
    vote_count?: number
    images?: Images
}

interface Crew {
    job?: string
    department?: string
    credit_id?: string
    adult?: boolean
    gender?: number
    id?: number
    known_for_department?: string
    name?: string
    original_name?: string
    popularity?: number
    profile_path?: null | string
}

interface GuestStar {
    character?: string
    credit_id?: string
    order?: number
    adult?: boolean
    gender?: number
    id?: number
    known_for_department?: string
    name?: string
    original_name?: string
    popularity?: number
    profile_path?: null | string
}

interface Images {
    stills?: Still[]
}

interface Still {
    aspect_ratio?: number
    height?: number
    iso_639_1?: null
    file_path?: string
    vote_average?: number
    vote_count?: number
    width?: number
}

export function useEpisodeQuery(variables: {
    id?: string
    season_number?: string
    episode_number?: String
}) {
    return useQuery<Data>({
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
