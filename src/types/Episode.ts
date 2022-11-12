import { Image } from './Shared'

export interface Episode {
    air_date?: string
    crew?: Credit[]
    episode_number?: number
    guest_stars?: Credit[]
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

interface Credit {
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
    profile_path?: string
    character?: string
    order?: number
}

interface Images {
    stills?: Image[]
}
