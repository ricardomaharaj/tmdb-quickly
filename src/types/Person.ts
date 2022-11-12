import { ExternalIDS, Image } from './Shared'

export interface Person {
    adult?: boolean
    also_known_as?: string[]
    biography?: string
    birthday?: string
    deathday?: string
    gender?: number
    homepage?: string
    id?: number
    imdb_id?: string
    known_for_department?: string
    name?: string
    place_of_birth?: string
    popularity?: number
    profile_path?: string
    combined_credits?: CombinedCredits
    images?: Images
    external_ids?: ExternalIDS
}

interface CombinedCredits {
    cast?: Credit[]
    crew?: Credit[]
}

interface Credit {
    adult?: boolean
    backdrop_path?: string
    genre_ids?: number[]
    id?: number
    original_language?: string
    original_title?: string
    overview?: string
    popularity?: number
    poster_path?: string
    release_date?: string
    title?: string
    video?: boolean
    vote_average?: number
    vote_count?: number
    character?: string
    credit_id?: string
    order?: number
    media_type?: string
    origin_country?: string[]
    original_name?: string
    first_air_date?: string
    name?: string
    episode_count?: number
    department?: string
    job?: string
}

interface Images {
    profiles?: Image[]
}
