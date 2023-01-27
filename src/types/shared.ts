export interface Image {
    aspect_ratio?: number
    height?: number
    iso_639_1?: string
    file_path?: string
    vote_average?: number
    vote_count?: number
    width?: number
}

export interface Genre {
    id?: number
    name?: string
}

export interface ProductionCompany {
    id?: number
    logo_path?: string
    name?: string
    origin_country?: string
}

export interface ProductionCountry {
    iso_3166_1?: string
    name?: string
}

export interface SpokenLanguage {
    english_name?: string
    iso_639_1?: string
    name?: string
}

export interface ExternalIDS {
    imdb_id?: string
    freebase_mid?: string
    freebase_id?: string
    tvdb_id?: number
    tvrage_id?: number
    facebook_id?: string
    instagram_id?: string
    twitter_id?: string
}

export interface VideoResult {
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
