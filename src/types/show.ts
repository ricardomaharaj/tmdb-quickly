import {
    ExternalIDS,
    Genre,
    Image,
    ProductionCompany,
    ProductionCountry,
    SpokenLanguage,
    VideoResult
} from './shared'

export interface Show {
    adult?: boolean
    backdrop_path?: string
    created_by?: CreatedBy[]
    episode_run_time?: number[]
    first_air_date?: string
    genres?: Genre[]
    homepage?: string
    id?: number
    in_production?: boolean
    languages?: string[]
    last_air_date?: string
    last_episode_to_air?: LastEpisodeToAir
    name?: string
    next_episode_to_air?: string
    networks?: ProductionCompany[]
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
    spoken_languages?: SpokenLanguage[]
    status?: string
    tagline?: string
    type?: string
    vote_average?: number
    vote_count?: number
    aggregate_credits?: AggregateCredits
    images?: Images
    external_ids?: ExternalIDS
    videos?: Videos
}

interface AggregateCredits {
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
    roles?: Role[]
    total_episode_count?: number
    order?: number
    jobs?: Job[]
    department?: string
}

interface Job {
    credit_id?: string
    job?: string
    episode_count?: number
}

interface Role {
    credit_id?: string
    character?: string
    episode_count?: number
}

interface CreatedBy {
    id?: number
    credit_id?: string
    name?: string
    gender?: number
    profile_path?: string
}

interface Images {
    backdrops?: Image[]
    logos?: Image[]
    posters?: Image[]
}

interface LastEpisodeToAir {
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
    results?: VideoResult[]
}
