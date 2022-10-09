import { gql, useQuery } from 'urql'

interface Data {
    show?: Show
}

interface Show {
    adult?: boolean
    backdrop_path?: string
    created_by?: CreatedBy[]
    episode_run_time?: number[]
    first_air_date?: string
    genres?: Genre[]
    homepage?: string
    id?: number
    in_production?: boolean
    last_air_date?: string
    name?: string
    networks?: Network[]
    number_of_episodes?: number
    number_of_seasons?: number
    origin_country?: string[]
    original_language?: string
    original_name?: string
    overview?: string
    popularity?: number
    poster_path?: string
    production_companies?: ProductionCompany[]
    production_countries?: ProductionCountry[]
    seasons?: Season[]
    status?: string
    tagline?: string
    type?: string
    vote_average?: number
    vote_count?: number
    aggregate_credits?: AggregateCredits
    videos?: Videos
    images?: Images
    external_ids?: ExternalIDS
}

interface AggregateCredits {
    cast?: Cast[]
    crew?: Crew[]
}

interface Cast {
    adult?: boolean
    gender?: number
    id?: number
    known_for_department?: string
    name?: string
    original_name?: string
    popularity?: number
    profile_path?: string
    roles?: Role[]
    total_episode_count?: number
    order?: number
}

interface Role {
    credit_id?: string
    character?: string
    episode_count?: number
}

interface Crew {
    adult?: boolean
    gender?: number
    id?: number
    known_for_department?: string
    name?: string
    original_name?: string
    popularity?: number
    profile_path?: string
    jobs?: Job[]
    department?: string
    total_episode_count?: number
}

interface Job {
    credit_id?: string
    job?: string
    episode_count?: number
}

interface CreatedBy {
    id?: number
    credit_id?: string
    name?: string
    gender?: number
    profile_path?: string
}

interface ExternalIDS {
    imdb_id?: string
    freebase_mid?: string
    freebase_id?: string
    tvdb_id?: number
    tvrage_id?: number
    facebook_id?: string
    instagram_id?: string
    twitter_id?: string
}

interface Genre {
    id?: number
    name?: string
}

interface Images {
    backdrops?: Backdrop[]
    logos?: Logo[]
    posters?: Backdrop[]
}

interface Backdrop {
    aspect_ratio?: number
    height?: number
    iso_639_1?: string
    file_path?: string
    vote_average?: number
    vote_count?: number
    width?: number
}

interface Logo {
    aspect_ratio?: number
    height?: number
    iso_639_1?: string
    file_path?: string
    vote_average?: number
    vote_count?: number
    width?: number
}

interface Network {
    id?: number
    name?: string
    logo_path?: string
    origin_country?: string
}

interface ProductionCompany {
    id?: number
    logo_path?: string
    name?: string
    origin_country?: string
}

interface ProductionCountry {
    iso_3166_1?: string
    name?: string
}

interface Season {
    air_date?: string
    episode_count?: number
    id?: number
    name?: string
    overview?: string
    poster_path?: string
    season_number?: number
}

interface Videos {
    results?: Result[]
}

interface Result {
    iso_639_1?: string
    iso_3166_1?: string
    name?: string
    key?: string
    site?: string
    size?: number
    type?: string
    official?: boolean
    published_at?: string
    id?: string
}

export function useShowQuery(variables: { id: string }) {
    return useQuery<Data>({
        query: gql`
            query ($id: ID) {
                show(id: $id)
            }
        `,
        variables
    })
}
