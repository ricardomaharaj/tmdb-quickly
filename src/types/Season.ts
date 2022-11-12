import { Image, VideoResult } from './Shared'

export interface Season {
    _id?: string
    air_date?: string
    episodes?: Episode[]
    name?: string
    overview?: string
    id?: number
    poster_path?: string
    season_number?: number
    images?: Images
    videos?: Videos
}

interface Episode {
    air_date?: string
    episode_number?: number
    id?: number
    name?: string
    overview?: string
    production_code?: string
    runtime?: number
    season_number?: number
    show_id?: number
    still_path?: string
    vote_average?: number
    vote_count?: number
    crew?: Credit[]
    guest_stars?: Credit[]
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
    posters?: Image[]
}

interface Videos {
    results?: VideoResult[]
}
