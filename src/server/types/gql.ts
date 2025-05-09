export type Search = {
  page?: number
  results?: SearchResult[]
  total_pages?: number
  total_results?: number
}

export type SearchResult = {
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

export type Find = {
  movie_results: SearchResult[]
  tv_results: SearchResult[]
}

export type Movie = {
  adult?: boolean
  backdrop_path?: string
  belongs_to_collection?: unknown
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
  release_dates?: ReleaseDates
  videos?: Videos
}

export type Genre = {
  id?: number
  name?: string
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

export type SpokenLanguage = {
  english_name?: string
  iso_639_1?: string
  name?: string
}

export type Credits = {
  id?: number
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

export type Images = {
  backdrops?: Image[]
  id?: number
  logos?: Image[]
  posters?: Image[]
  stills?: Image[]
  profiles?: Image[]
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

export type ReleaseDates = {
  id?: number
  results?: ReleaseDateResult[]
}

export type ReleaseDateResult = {
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

export type Videos = {
  id?: number
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
  external_ids?: ExternalIds
  images?: Images
  videos?: Videos
}

export type Network = {
  id?: number
  logo_path?: string
  name?: string
  origin_country?: string
}

export type Season = {
  air_date?: string
  episode_count?: number
  id?: number
  name?: string
  overview?: string
  poster_path?: string
  season_number?: number
  vote_average?: number
}

export type AggregateCredits = {
  cast?: AggregateCast[]
  crew?: AggregateCrew[]
  id?: number
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

export type ExternalIds = {
  id?: number
  imdb_id?: string
  freebase_mid?: string
  freebase_id?: string
  tvdb_id?: number
  tvrage_id?: number
  wikidata_id?: string
  facebook_id?: string
  instagram_id?: string
  twitter_id?: string
}

export type TVSeason = {
  _id?: string
  air_date?: string
  episodes?: Episode[]
  name?: string
  overview?: string
  id?: number
  poster_path?: string
  season_number?: number
  vote_average?: number
  credits?: Credits
  images?: Images
  videos?: Videos
}

export type Episode = {
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

export type TVEpisode = {
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
  images?: Images
  videos?: Videos
}

export type Person = {
  adult?: boolean
  also_known_as?: string[]
  biography?: string
  birthday?: string
  deathday?: string
  gender?: number
  homepage?: string
  id?: number
  imdb_id?: string
  known_for_department?: string
  name?: string
  place_of_birth?: string
  popularity?: number
  profile_path?: string
  combined_credits?: CombinedCredits
  images?: Images
}

export type CombinedCredits = {
  cast?: CombinedCast[]
  crew?: CombinedCrew[]
  id?: number
}

export type CombinedCast = {
  adult?: boolean
  backdrop_path?: string
  genre_ids?: number[]
  id?: number
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: number
  poster_path?: string
  release_date?: string
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
  character?: string
  credit_id?: string
  order?: number
  media_type?: string
  origin_country?: string[]
  original_name?: string
  first_air_date?: string
  name?: string
  episode_count?: number
}

export type CombinedCrew = {
  adult?: boolean
  backdrop_path?: string
  genre_ids?: number[]
  id?: number
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: number
  poster_path?: string
  release_date?: string
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
  credit_id?: string
  department?: string
  job?: string
  media_type?: string
  origin_country?: string[]
  original_name?: string
  first_air_date?: string
  name?: string
  episode_count?: number
}
