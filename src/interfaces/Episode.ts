export interface Episode {
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

export interface Crew {
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

export interface GuestStar {
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
