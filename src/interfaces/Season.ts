interface Season {
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

export interface Episode {
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
    crew?: Crew[]
    guest_stars?: GuestStar[]
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
    profile_path?: string
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
    profile_path?: string
}

interface Images {
    posters?: Poster[]
}

interface Poster {
    aspect_ratio?: number
    height?: number
    iso_639_1?: string
    file_path?: string
    vote_average?: number
    vote_count?: number
    width?: number
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

export default Season
