export type SearchResults = {
  page: number
  results: SearchResult[]
  total_pages: number
  total_results: number
}

type SearchResult = {
  adult: Boolean
  backdrop_path: string
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: Boolean
  vote_average: number
  vote_count: number
  name: string
  original_name: string
  first_air_date: string
  origin_country: string[]
  gender: number
  known_for_department: string
  profile_path: string
  known_for: KnownFor[]
}

type KnownFor = {
  adult: Boolean
  backdrop_path: string
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: Boolean
  vote_average: number
  vote_count: number
  name: string
  original_name: string
  first_air_date: string
  origin_country: string[]
}

export type Movie = {
  adult: Boolean
  backdrop_path: string
  belongs_to_collection: BelongsToCollection
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: Boolean
  vote_average: number
  vote_count: number
  credits: Credits
  images: Images
  videos: Videos
}

type BelongsToCollection = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

type Credits = {
  cast: Cast[]
  crew: Crew[]
}

type Cast = {
  adult: Boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

type Crew = {
  adult: Boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}

type Genre = {
  id: number
  name: string
}

type Images = {
  backdrops: Image[]
  logos: Image[]
  posters: Image[]
}

type Image = {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

type ProductionCompany = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

type ProductionCountry = {
  iso_3166_1: string
  name: string
}

type SpokenLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}

type Videos = {
  results: VideoResult[]
}

type VideoResult = {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: Boolean
  published_at: string
  id: string
}

export type TV = {
  adult: Boolean
  backdrop_path: string
  created_by: CreatedBy[]
  episode_run_time: number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: Boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: LastEpisodeToAir
  name: string
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  seasons: TVSeason[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
  aggregate_credits: AggregateCredits
  images: Images
  videos: Videos
}

type AggregateCredits = {
  cast: AggregateCast[]
  crew: AggregateCrew[]
}

type AggregateCast = {
  adult: Boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  roles: Role[]
  total_episode_count: number
  order: number
}

type Role = {
  credit_id: string
  character: string
  episode_count: number
}

type AggregateCrew = {
  adult: Boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  jobs: Job[]
  department: string
  total_episode_count: number
}

type Job = {
  credit_id: string
  job: string
  episode_count: number
}

type CreatedBy = {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}

type LastEpisodeToAir = {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
}

type Network = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

type TVSeason = {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
}

export type Season = {
  _id: string
  air_date: string
  episodes: SeasonEpisode[]
  name: string
  overview: string
  id: number
  poster_path: string
  season_number: number
  credits: Credits
  images: Images
  videos: Videos
}

type SeasonEpisode = {
  air_date: string
  episode_number: number
  id: number
  name: string
  overview: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
  vote_average: number
  vote_count: number
  crew: Crew[]
  guest_stars: GuestStar[]
}

type GuestStar = {
  character: string
  credit_id: string
  order: number
  adult: Boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
}

export type Episode = {
  air_date: string
  crew: Crew[]
  episode_number: number
  guest_stars: GuestStar[]
  name: string
  overview: string
  id: number
  production_code: string
  runtime: number
  season_number: number
  still_path: string
  vote_average: number
  vote_count: number
  credits: EpisodeCredits
  images: EpisodeImages
  videos: Videos
}

type EpisodeCredits = {
  cast: Cast[]
  crew: Crew[]
  guest_stars: GuestStar[]
}

type EpisodeImages = {
  stills: Image[]
}
