export type Search = {
  page?: number
  results?: Result[]
  total_pages?: number
  total_results?: number
}

export type Result = {
  adult?: boolean
  backdrop_path?: string
  id?: number
  title?: string
  original_language?: string
  original_title?: string
  overview?: string
  poster_path?: string
  profile_path?: string
  media_type?: string
  genre_ids?: number[]
  popularity?: number
  release_date?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
  name?: string
  original_name?: string
  first_air_date?: string
  origin_country?: string[]
}

export type Movie = {
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
  images?: Images
  videos?: Videos
  release_dates?: ReleaseDates
}

export type BelongsToCollection = {
  id?: number
  name?: string
  poster_path?: string
  backdrop_path?: string
}

export type Credits = {
  cast?: Cast[]
  crew?: Crew[]
}

export type Cast = {
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

export type Crew = {
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

export type Genre = {
  id?: number
  name?: string
}

export type Images = {
  backdrops?: Image[]
  logos?: Image[]
  posters?: Image[]
  stills?: Image[]
}

export type Image = {
  aspect_ratio?: number
  height?: number
  iso_639_1?: string
  file_path?: string
  vote_average?: number
  vote_count?: number
  width?: number
}

export type ProductionCompany = {
  id?: number
  logo_path?: string
  name?: string
  origin_country?: string
}

export type ProductionCountry = {
  iso_3166_1?: string
  name?: string
}

export type ReleaseDates = {
  results?: ReleaseDatesResult[]
}

export type ReleaseDatesResult = {
  iso_3166_1?: string
  release_dates?: ReleaseDate[]
}

export type ReleaseDate = {
  certification?: string
  descriptors?: string[]
  iso_639_1?: string
  note?: string
  release_date?: string
  type?: number
}

export type SpokenLanguage = {
  english_name?: string
  iso_639_1?: string
  name?: string
}

export type Videos = {
  results?: VideoResult[]
}

export type VideoResult = {
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

export type TV = {
  adult?: boolean
  backdrop_path?: string
  episode_run_time?: number[]
  first_air_date?: string
  genres?: Genre[]
  homepage?: string
  id?: number
  in_production?: boolean
  languages?: string[]
  last_air_date?: string
  name?: string
  networks?: Network[]
  number_of_episodes?: number
  number_of_seasons?: number
  origin_country?: string[]
  original_language?: string
  original_name?: string
  overview?: string
  popularity?: number
  poster_path?: string
  production_companies?: Network[]
  production_countries?: ProductionCountry[]
  seasons?: TVSeason[]
  spoken_languages?: SpokenLanguage[]
  status?: string
  tagline?: string
  type?: string
  vote_average?: number
  vote_count?: number
  aggregate_credits?: AggregateCredits
  images?: Images
  videos?: Videos
}

export type AggregateCredits = {
  cast?: AggregateCast[]
  crew?: AggregateCrew[]
}

export type AggregateCast = {
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
}

export type Role = {
  credit_id?: string
  character?: string
  episode_count?: number
}

export type AggregateCrew = {
  adult?: boolean
  gender?: number
  id?: number
  known_for_department?: string
  name?: string
  original_name?: string
  popularity?: number
  profile_path?: string
  jobs?: Job[]
  department?: string
  total_episode_count?: number
}

export type Job = {
  credit_id?: string
  job?: string
  episode_count?: number
}

export type Network = {
  id?: number
  logo_path?: string
  name?: string
  origin_country?: string
}

export type TVSeason = {
  air_date?: string
  episode_count?: number
  id?: number
  name?: string
  overview?: string
  poster_path?: string
  season_number?: number
}

export type Season = {
  _id?: string
  air_date?: string
  episodes?: SeasonEpisode[]
  name?: string
  overview?: string
  id?: number
  poster_path?: string
  season_number?: number
  credits?: Credits
  images?: Images
  videos?: Videos
}

export type SeasonEpisode = {
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
  guest_stars?: Cast[]
}

export type Episode = {
  air_date?: string
  crew?: Crew[]
  episode_number?: number
  guest_stars?: Cast[]
  name?: string
  overview?: string
  id?: number
  production_code?: string
  runtime?: number
  season_number?: number
  still_path?: string
  vote_average?: number
  vote_count?: number
  credits?: Credits
  images?: Images
  videos?: Videos
}
