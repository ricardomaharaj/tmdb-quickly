export interface Search {
    page?: number
    results?: Result[]
    total_pages?: number
    total_results?: number
}

export interface Result {
    backdrop_path?: string
    first_air_date?: string
    genre_ids?: number[]
    id?: number
    media_type?: string
    name?: string
    origin_country?: string[]
    original_language?: string
    original_name?: string
    overview?: string
    popularity?: number
    poster_path?: string
    vote_average?: number
    vote_count?: number
    adult?: boolean
    gender?: number
    known_for_department?: string
    profile_path?: string
    original_title?: string
    release_date?: string
    title?: string
    video?: boolean
}
