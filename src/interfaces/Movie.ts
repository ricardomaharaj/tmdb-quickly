export interface Movie {
    adult?: boolean
    backdrop_path?: string
    budget?: number
    genres?: Genre[]
    homepage?: string
    id?: number
    imdb_id?: string
    original_language?: string
    original_title?: string
    overview?: string
    popularity?: number
    poster_path?: string
    production_companies?: ProductionCompany[]
    production_countries?: ProductionCountry[]
    release_date?: string
    revenue?: number
    runtime?: number
    spoken_languages?: SpokenLanguage[]
    status?: string
    tagline?: string
    title?: string
    video?: boolean
    vote_average?: number
    vote_count?: number
    credits?: Credits
    videos?: Videos
    images?: Images
    release_dates?: ReleaseDates
}

interface Credits {
    cast?: Cast[]
    crew?: Crew[]
}

export interface Cast {
    adult?: boolean
    gender?: number
    id?: number
    known_for_department?: string
    name?: string
    original_name?: string
    popularity?: number
    profile_path?: string
    cast_id?: number
    character?: string
    credit_id?: string
    order?: number
}

export interface Crew {
    adult?: boolean
    gender?: number
    id?: number
    known_for_department?: string
    name?: string
    original_name?: string
    popularity?: number
    profile_path?: string
    credit_id?: string
    department?: string
    job?: string
}

interface Genre {
    id?: number
    name?: string
}

interface Images {
    backdrops?: Backdrop[]
    posters?: Poster[]
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

interface Poster {
    aspect_ratio?: number
    height?: number
    iso_639_1?: string
    file_path?: string
    vote_average?: number
    vote_count?: number
    width?: number
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

interface ReleaseDates {
    results?: ReleaseDatesResult[]
}

interface ReleaseDatesResult {
    iso_3166_1?: string
    release_dates?: ReleaseDate[]
}

interface ReleaseDate {
    certification?: string
    iso_639_1?: string
    note?: string
    release_date?: string
    type?: number
}

interface SpokenLanguage {
    english_name?: string
    iso_639_1?: string
    name?: string
}

interface Videos {
    results?: VideosResult[]
}

interface VideosResult {
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
