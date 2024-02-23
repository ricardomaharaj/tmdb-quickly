import { createSchema } from 'graphql-yoga'
import { movieResolver } from './resolvers/movie'
import { personResolver } from './resolvers/person'
import { searchResolver } from './resolvers/search'
import { tvResolver } from './resolvers/tv'
import { tvEpisodeResolver } from './resolvers/tv-episode'
import { tvSeasonResolver } from './resolvers/tv-season'

export const typeDefs = /* GraphQL */ `
  scalar Unknown

  type Search {
    page: Int
    results: [SearchResult]
    total_pages: Int
    total_results: Int
  }

  type SearchResult {
    adult: Boolean
    backdrop_path: String
    id: Int
    title: String
    original_language: String
    original_title: String
    overview: String
    poster_path: String
    profile_path: String
    media_type: String
    genre_ids: [Int]
    popularity: Int
    release_date: String
    video: Boolean
    vote_average: Float
    vote_count: Int
    name: String
    original_name: String
    first_air_date: String
    origin_country: [String]
  }

  type Movie {
    adult: Boolean
    backdrop_path: String
    belongs_to_collection: Unknown
    budget: Int
    genres: [Genre]
    homepage: String
    id: Int
    imdb_id: String
    original_language: String
    original_title: String
    overview: String
    popularity: Int
    poster_path: String
    production_companies: [ProductionCompany]
    production_countries: [ProductionCountry]
    release_date: String
    revenue: Float
    runtime: Int
    spoken_languages: [SpokenLanguage]
    status: String
    tagline: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
    credits: Credits
    images: Images
    release_dates: ReleaseDates
    videos: Videos
  }

  type Genre {
    id: Int
    name: String
  }

  type ProductionCompany {
    id: Int
    logo_path: String
    name: String
    origin_country: String
  }

  type ProductionCountry {
    iso_3166_1: String
    name: String
  }

  type SpokenLanguage {
    english_name: String
    iso_639_1: String
    name: String
  }

  type Credits {
    id: Int
    cast: [Cast]
    crew: [Crew]
  }

  type Cast {
    adult: Boolean
    gender: Int
    id: Int
    known_for_department: String
    name: String
    original_name: String
    popularity: Int
    profile_path: String
    cast_id: Int
    character: String
    credit_id: String
    order: Int
  }

  type Crew {
    adult: Boolean
    gender: Int
    id: Int
    known_for_department: String
    name: String
    original_name: String
    popularity: Int
    profile_path: String
    credit_id: String
    department: String
    job: String
  }

  type Images {
    backdrops: [Image]
    id: Int
    logos: [Image]
    posters: [Image]
    stills: [Image]
    profiles: [Image]
  }

  type Image {
    aspect_ratio: Int
    height: Int
    iso_639_1: String
    file_path: String
    vote_average: Float
    vote_count: Int
    width: Int
  }

  type ReleaseDates {
    id: Int
    results: [ReleaseDateResult]
  }

  type ReleaseDateResult {
    iso_3166_1: String
    release_dates: [ReleaseDate]
  }

  type ReleaseDate {
    certification: String
    descriptors: [String]
    iso_639_1: String
    note: String
    release_date: String
    type: Int
  }

  type Videos {
    id: Int
    results: [VideoResult]
  }

  type VideoResult {
    iso_639_1: String
    iso_3166_1: String
    name: String
    key: String
    site: String
    size: Int
    type: String
    official: Boolean
    published_at: String
    id: String
  }

  type TV {
    adult: Boolean
    backdrop_path: String
    episode_run_time: [Int]
    first_air_date: String
    genres: [Genre]
    homepage: String
    id: Int
    in_production: Boolean
    languages: [String]
    last_air_date: String
    name: String
    networks: [Network]
    number_of_episodes: Int
    number_of_seasons: Int
    origin_country: [String]
    original_language: String
    original_name: String
    overview: String
    popularity: Int
    poster_path: String
    production_companies: [ProductionCompany]
    production_countries: [ProductionCountry]
    seasons: [Season]
    spoken_languages: [SpokenLanguage]
    status: String
    tagline: String
    type: String
    vote_average: Float
    vote_count: Int
    aggregate_credits: AggregateCredits
    external_ids: ExternalIds
    images: Images
    videos: Videos
  }

  type Network {
    id: Int
    logo_path: String
    name: String
    origin_country: String
  }

  type Season {
    air_date: String
    episode_count: Int
    id: Int
    name: String
    overview: String
    poster_path: String
    season_number: Int
    vote_average: Float
  }

  type AggregateCredits {
    cast: [AggregateCast]
    crew: [AggregateCrew]
    id: Int
  }

  type AggregateCast {
    adult: Boolean
    gender: Int
    id: Int
    known_for_department: String
    name: String
    original_name: String
    popularity: Int
    profile_path: String
    roles: [Role]
    total_episode_count: Int
    order: Int
  }

  type Role {
    credit_id: String
    character: String
    episode_count: Int
  }

  type AggregateCrew {
    adult: Boolean
    gender: Int
    id: Int
    known_for_department: String
    name: String
    original_name: String
    popularity: Int
    profile_path: String
    jobs: [Job]
    department: String
    total_episode_count: Int
  }

  type Job {
    credit_id: String
    job: String
    episode_count: Int
  }

  type ExternalIds {
    id: Int
    imdb_id: String
    freebase_mid: String
    freebase_id: String
    tvdb_id: Int
    tvrage_id: Int
    wikidata_id: String
    facebook_id: String
    instagram_id: String
    twitter_id: String
  }

  type TVSeason {
    _id: String
    air_date: String
    episodes: [Episode]
    name: String
    overview: String
    id: Int
    poster_path: String
    season_number: Int
    vote_average: Float
    credits: Credits
    images: Images
    videos: Videos
  }

  type Episode {
    air_date: String
    episode_number: Int
    id: Int
    name: String
    overview: String
    production_code: String
    runtime: Int
    season_number: Int
    show_id: Int
    still_path: String
    vote_average: Float
    vote_count: Int
    crew: [Crew]
    guest_stars: [Cast]
  }

  type TVEpisode {
    air_date: String
    crew: [Crew]
    episode_number: Int
    guest_stars: [Cast]
    name: String
    overview: String
    id: Int
    production_code: String
    runtime: Int
    season_number: Int
    still_path: String
    vote_average: Float
    vote_count: Int
    images: Images
    videos: Videos
  }

  type Person {
    adult: Boolean
    also_known_as: [String]
    biography: String
    birthday: String
    deathday: String
    gender: Int
    homepage: String
    id: Int
    imdb_id: String
    known_for_department: String
    name: String
    place_of_birth: String
    popularity: Int
    profile_path: String
    combined_credits: CombinedCredits
    images: Images
  }

  type CombinedCredits {
    cast: [CombinedCast]
    crew: [CombinedCrew]
    id: Int
  }

  type CombinedCast {
    adult: Boolean
    backdrop_path: String
    genre_ids: [Int]
    id: Int
    original_language: String
    original_title: String
    overview: String
    popularity: Int
    poster_path: String
    release_date: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
    character: String
    credit_id: String
    order: Int
    media_type: String
    origin_country: [String]
    original_name: String
    first_air_date: String
    name: String
    episode_count: Int
  }

  type CombinedCrew {
    adult: Boolean
    backdrop_path: String
    genre_ids: [Int]
    id: Int
    original_language: String
    original_title: String
    overview: String
    popularity: Int
    poster_path: String
    release_date: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
    credit_id: String
    department: String
    job: String
    media_type: String
    origin_country: [String]
    original_name: String
    first_air_date: String
    name: String
    episode_count: Int
  }

  type Query {
    search(query: String, page: Int): Search
    movie(id: String!, query: String, page: Int): Movie
    tv(id: String!, query: String, page: Int): TV
    tvSeason(
      id: String!
      season_number: String!
      query: String
      page: Int
    ): TVSeason
    tvEpisode(
      id: String!
      season_number: String!
      episode_number: String!
      query: String
      page: Int
    ): TVEpisode
    person(id: String!, query: String, page: Int, filter: String): Person
  }
`

export const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: {
    Query: {
      search: searchResolver,
      movie: movieResolver,
      tv: tvResolver,
      tvSeason: tvSeasonResolver,
      tvEpisode: tvEpisodeResolver,
      person: personResolver,
    },
  },
})
