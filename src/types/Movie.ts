import {
    Genre,
    Image,
    ProductionCompany,
    ProductionCountry,
    SpokenLanguage,
    VideoResult
} from './Shared'

export interface Movie {
    adult?: boolean
    backdrop_path?: string
    belongs_to_collection?: BelongsToCollection
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

interface BelongsToCollection {
    id?: number
    name?: string
    poster_path?: string
    backdrop_path?: string
}

interface Credits {
    cast?: Credit[]
    crew?: Credit[]
}

interface Credit {
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
    department?: string
    job?: string
}

interface Images {
    backdrops?: Image[]
    logos?: Image[]
    posters?: Image[]
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

interface Videos {
    results?: VideoResult[]
}