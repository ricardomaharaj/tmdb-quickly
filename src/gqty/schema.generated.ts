/**
 * GQTY AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

export type Maybe<T> = T
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Unknown: any
}

export const scalarsEnumsHash: import('gqty').ScalarsEnumsHash = {
  Boolean: true,
  Float: true,
  Int: true,
  String: true,
  Unknown: true,
}
export const generatedSchema = {
  AggregateCast: {
    __typename: { __type: 'String!' },
    adult: { __type: 'Boolean' },
    gender: { __type: 'Int' },
    id: { __type: 'Int' },
    known_for_department: { __type: 'String' },
    name: { __type: 'String' },
    order: { __type: 'Int' },
    original_name: { __type: 'String' },
    popularity: { __type: 'Int' },
    profile_path: { __type: 'String' },
    roles: { __type: '[Role]' },
    total_episode_count: { __type: 'Int' },
  },
  AggregateCredits: {
    __typename: { __type: 'String!' },
    cast: { __type: '[AggregateCast]' },
    crew: { __type: '[AggregateCrew]' },
    id: { __type: 'Int' },
  },
  AggregateCrew: {
    __typename: { __type: 'String!' },
    adult: { __type: 'Boolean' },
    department: { __type: 'String' },
    gender: { __type: 'Int' },
    id: { __type: 'Int' },
    jobs: { __type: '[Job]' },
    known_for_department: { __type: 'String' },
    name: { __type: 'String' },
    original_name: { __type: 'String' },
    popularity: { __type: 'Int' },
    profile_path: { __type: 'String' },
    total_episode_count: { __type: 'Int' },
  },
  Cast: {
    __typename: { __type: 'String!' },
    adult: { __type: 'Boolean' },
    cast_id: { __type: 'Int' },
    character: { __type: 'String' },
    credit_id: { __type: 'String' },
    gender: { __type: 'Int' },
    id: { __type: 'Int' },
    known_for_department: { __type: 'String' },
    name: { __type: 'String' },
    order: { __type: 'Int' },
    original_name: { __type: 'String' },
    popularity: { __type: 'Int' },
    profile_path: { __type: 'String' },
  },
  CombinedCast: {
    __typename: { __type: 'String!' },
    adult: { __type: 'Boolean' },
    backdrop_path: { __type: 'String' },
    character: { __type: 'String' },
    credit_id: { __type: 'String' },
    episode_count: { __type: 'Int' },
    first_air_date: { __type: 'String' },
    genre_ids: { __type: '[Int]' },
    id: { __type: 'Int' },
    media_type: { __type: 'String' },
    name: { __type: 'String' },
    order: { __type: 'Int' },
    origin_country: { __type: '[String]' },
    original_language: { __type: 'String' },
    original_name: { __type: 'String' },
    original_title: { __type: 'String' },
    overview: { __type: 'String' },
    popularity: { __type: 'Int' },
    poster_path: { __type: 'String' },
    release_date: { __type: 'String' },
    title: { __type: 'String' },
    video: { __type: 'Boolean' },
    vote_average: { __type: 'Float' },
    vote_count: { __type: 'Int' },
  },
  CombinedCredits: {
    __typename: { __type: 'String!' },
    cast: { __type: '[CombinedCast]' },
    crew: { __type: '[CombinedCrew]' },
    id: { __type: 'Int' },
  },
  CombinedCrew: {
    __typename: { __type: 'String!' },
    adult: { __type: 'Boolean' },
    backdrop_path: { __type: 'String' },
    credit_id: { __type: 'String' },
    department: { __type: 'String' },
    episode_count: { __type: 'Int' },
    first_air_date: { __type: 'String' },
    genre_ids: { __type: '[Int]' },
    id: { __type: 'Int' },
    job: { __type: 'String' },
    media_type: { __type: 'String' },
    name: { __type: 'String' },
    origin_country: { __type: '[String]' },
    original_language: { __type: 'String' },
    original_name: { __type: 'String' },
    original_title: { __type: 'String' },
    overview: { __type: 'String' },
    popularity: { __type: 'Int' },
    poster_path: { __type: 'String' },
    release_date: { __type: 'String' },
    title: { __type: 'String' },
    video: { __type: 'Boolean' },
    vote_average: { __type: 'Float' },
    vote_count: { __type: 'Int' },
  },
  Credits: {
    __typename: { __type: 'String!' },
    cast: { __type: '[Cast]' },
    crew: { __type: '[Crew]' },
    id: { __type: 'Int' },
  },
  Crew: {
    __typename: { __type: 'String!' },
    adult: { __type: 'Boolean' },
    credit_id: { __type: 'String' },
    department: { __type: 'String' },
    gender: { __type: 'Int' },
    id: { __type: 'Int' },
    job: { __type: 'String' },
    known_for_department: { __type: 'String' },
    name: { __type: 'String' },
    original_name: { __type: 'String' },
    popularity: { __type: 'Int' },
    profile_path: { __type: 'String' },
  },
  Episode: {
    __typename: { __type: 'String!' },
    air_date: { __type: 'String' },
    crew: { __type: '[Crew]' },
    episode_number: { __type: 'Int' },
    guest_stars: { __type: '[Cast]' },
    id: { __type: 'Int' },
    name: { __type: 'String' },
    overview: { __type: 'String' },
    production_code: { __type: 'String' },
    runtime: { __type: 'Int' },
    season_number: { __type: 'Int' },
    show_id: { __type: 'Int' },
    still_path: { __type: 'String' },
    vote_average: { __type: 'Float' },
    vote_count: { __type: 'Int' },
  },
  ExternalIds: {
    __typename: { __type: 'String!' },
    facebook_id: { __type: 'String' },
    freebase_id: { __type: 'String' },
    freebase_mid: { __type: 'String' },
    id: { __type: 'Int' },
    imdb_id: { __type: 'String' },
    instagram_id: { __type: 'String' },
    tvdb_id: { __type: 'Int' },
    tvrage_id: { __type: 'Int' },
    twitter_id: { __type: 'String' },
    wikidata_id: { __type: 'String' },
  },
  Genre: {
    __typename: { __type: 'String!' },
    id: { __type: 'Int' },
    name: { __type: 'String' },
  },
  Image: {
    __typename: { __type: 'String!' },
    aspect_ratio: { __type: 'Int' },
    file_path: { __type: 'String' },
    height: { __type: 'Int' },
    iso_639_1: { __type: 'String' },
    vote_average: { __type: 'Float' },
    vote_count: { __type: 'Int' },
    width: { __type: 'Int' },
  },
  Images: {
    __typename: { __type: 'String!' },
    backdrops: { __type: '[Image]' },
    id: { __type: 'Int' },
    logos: { __type: '[Image]' },
    posters: { __type: '[Image]' },
    profiles: { __type: '[Image]' },
    stills: { __type: '[Image]' },
  },
  Job: {
    __typename: { __type: 'String!' },
    credit_id: { __type: 'String' },
    episode_count: { __type: 'Int' },
    job: { __type: 'String' },
  },
  Movie: {
    __typename: { __type: 'String!' },
    adult: { __type: 'Boolean' },
    backdrop_path: { __type: 'String' },
    belongs_to_collection: { __type: 'Unknown' },
    budget: { __type: 'Float' },
    credits: { __type: 'Credits' },
    genres: { __type: '[Genre]' },
    homepage: { __type: 'String' },
    id: { __type: 'Int' },
    images: { __type: 'Images' },
    imdb_id: { __type: 'String' },
    original_language: { __type: 'String' },
    original_title: { __type: 'String' },
    overview: { __type: 'String' },
    popularity: { __type: 'Int' },
    poster_path: { __type: 'String' },
    production_companies: { __type: '[ProductionCompany]' },
    production_countries: { __type: '[ProductionCountry]' },
    release_date: { __type: 'String' },
    release_dates: { __type: 'ReleaseDates' },
    revenue: { __type: 'Float' },
    runtime: { __type: 'Int' },
    spoken_languages: { __type: '[SpokenLanguage]' },
    status: { __type: 'String' },
    tagline: { __type: 'String' },
    title: { __type: 'String' },
    video: { __type: 'Boolean' },
    videos: { __type: 'Videos' },
    vote_average: { __type: 'Float' },
    vote_count: { __type: 'Int' },
  },
  Network: {
    __typename: { __type: 'String!' },
    id: { __type: 'Int' },
    logo_path: { __type: 'String' },
    name: { __type: 'String' },
    origin_country: { __type: 'String' },
  },
  Person: {
    __typename: { __type: 'String!' },
    adult: { __type: 'Boolean' },
    also_known_as: { __type: '[String]' },
    biography: { __type: 'String' },
    birthday: { __type: 'String' },
    combined_credits: { __type: 'CombinedCredits' },
    deathday: { __type: 'String' },
    gender: { __type: 'Int' },
    homepage: { __type: 'String' },
    id: { __type: 'Int' },
    images: { __type: 'Images' },
    imdb_id: { __type: 'String' },
    known_for_department: { __type: 'String' },
    name: { __type: 'String' },
    place_of_birth: { __type: 'String' },
    popularity: { __type: 'Int' },
    profile_path: { __type: 'String' },
  },
  ProductionCompany: {
    __typename: { __type: 'String!' },
    id: { __type: 'Int' },
    logo_path: { __type: 'String' },
    name: { __type: 'String' },
    origin_country: { __type: 'String' },
  },
  ProductionCountry: {
    __typename: { __type: 'String!' },
    iso_3166_1: { __type: 'String' },
    name: { __type: 'String' },
  },
  ReleaseDate: {
    __typename: { __type: 'String!' },
    certification: { __type: 'String' },
    descriptors: { __type: '[String]' },
    iso_639_1: { __type: 'String' },
    note: { __type: 'String' },
    release_date: { __type: 'String' },
    type: { __type: 'Int' },
  },
  ReleaseDateResult: {
    __typename: { __type: 'String!' },
    iso_3166_1: { __type: 'String' },
    release_dates: { __type: '[ReleaseDate]' },
  },
  ReleaseDates: {
    __typename: { __type: 'String!' },
    id: { __type: 'Int' },
    results: { __type: '[ReleaseDateResult]' },
  },
  Role: {
    __typename: { __type: 'String!' },
    character: { __type: 'String' },
    credit_id: { __type: 'String' },
    episode_count: { __type: 'Int' },
  },
  Search: {
    __typename: { __type: 'String!' },
    page: { __type: 'Int' },
    results: { __type: '[SearchResult]' },
    total_pages: { __type: 'Int' },
    total_results: { __type: 'Int' },
  },
  SearchResult: {
    __typename: { __type: 'String!' },
    adult: { __type: 'Boolean' },
    backdrop_path: { __type: 'String' },
    first_air_date: { __type: 'String' },
    genre_ids: { __type: '[Int]' },
    id: { __type: 'Int' },
    media_type: { __type: 'String' },
    name: { __type: 'String' },
    origin_country: { __type: '[String]' },
    original_language: { __type: 'String' },
    original_name: { __type: 'String' },
    original_title: { __type: 'String' },
    overview: { __type: 'String' },
    popularity: { __type: 'Int' },
    poster_path: { __type: 'String' },
    profile_path: { __type: 'String' },
    release_date: { __type: 'String' },
    title: { __type: 'String' },
    video: { __type: 'Boolean' },
    vote_average: { __type: 'Float' },
    vote_count: { __type: 'Int' },
  },
  Season: {
    __typename: { __type: 'String!' },
    air_date: { __type: 'String' },
    episode_count: { __type: 'Int' },
    id: { __type: 'Int' },
    name: { __type: 'String' },
    overview: { __type: 'String' },
    poster_path: { __type: 'String' },
    season_number: { __type: 'Int' },
    vote_average: { __type: 'Float' },
  },
  SpokenLanguage: {
    __typename: { __type: 'String!' },
    english_name: { __type: 'String' },
    iso_639_1: { __type: 'String' },
    name: { __type: 'String' },
  },
  TV: {
    __typename: { __type: 'String!' },
    adult: { __type: 'Boolean' },
    aggregate_credits: { __type: 'AggregateCredits' },
    backdrop_path: { __type: 'String' },
    episode_run_time: { __type: '[Int]' },
    external_ids: { __type: 'ExternalIds' },
    first_air_date: { __type: 'String' },
    genres: { __type: '[Genre]' },
    homepage: { __type: 'String' },
    id: { __type: 'Int' },
    images: { __type: 'Images' },
    in_production: { __type: 'Boolean' },
    languages: { __type: '[String]' },
    last_air_date: { __type: 'String' },
    name: { __type: 'String' },
    networks: { __type: '[Network]' },
    number_of_episodes: { __type: 'Int' },
    number_of_seasons: { __type: 'Int' },
    origin_country: { __type: '[String]' },
    original_language: { __type: 'String' },
    original_name: { __type: 'String' },
    overview: { __type: 'String' },
    popularity: { __type: 'Int' },
    poster_path: { __type: 'String' },
    production_companies: { __type: '[ProductionCompany]' },
    production_countries: { __type: '[ProductionCountry]' },
    seasons: { __type: '[Season]' },
    spoken_languages: { __type: '[SpokenLanguage]' },
    status: { __type: 'String' },
    tagline: { __type: 'String' },
    type: { __type: 'String' },
    videos: { __type: 'Videos' },
    vote_average: { __type: 'Float' },
    vote_count: { __type: 'Int' },
  },
  TVEpisode: {
    __typename: { __type: 'String!' },
    air_date: { __type: 'String' },
    crew: { __type: '[Crew]' },
    episode_number: { __type: 'Int' },
    guest_stars: { __type: '[Cast]' },
    id: { __type: 'Int' },
    images: { __type: 'Images' },
    name: { __type: 'String' },
    overview: { __type: 'String' },
    production_code: { __type: 'String' },
    runtime: { __type: 'Int' },
    season_number: { __type: 'Int' },
    still_path: { __type: 'String' },
    videos: { __type: 'Videos' },
    vote_average: { __type: 'Float' },
    vote_count: { __type: 'Int' },
  },
  TVSeason: {
    __typename: { __type: 'String!' },
    _id: { __type: 'String' },
    air_date: { __type: 'String' },
    credits: { __type: 'Credits' },
    episodes: { __type: '[Episode]' },
    id: { __type: 'Int' },
    images: { __type: 'Images' },
    name: { __type: 'String' },
    overview: { __type: 'String' },
    poster_path: { __type: 'String' },
    season_number: { __type: 'Int' },
    videos: { __type: 'Videos' },
    vote_average: { __type: 'Float' },
  },
  VideoResult: {
    __typename: { __type: 'String!' },
    id: { __type: 'String' },
    iso_639_1: { __type: 'String' },
    iso_3166_1: { __type: 'String' },
    key: { __type: 'String' },
    name: { __type: 'String' },
    official: { __type: 'Boolean' },
    published_at: { __type: 'String' },
    site: { __type: 'String' },
    size: { __type: 'Int' },
    type: { __type: 'String' },
  },
  Videos: {
    __typename: { __type: 'String!' },
    id: { __type: 'Int' },
    results: { __type: '[VideoResult]' },
  },
  mutation: {},
  query: {
    __typename: { __type: 'String!' },
    movie: {
      __type: 'Movie',
      __args: { id: 'String!', page: 'Int', query: 'String' },
    },
    person: {
      __type: 'Person',
      __args: { filter: 'String', id: 'String!', page: 'Int', query: 'String' },
    },
    search: { __type: 'Search', __args: { page: 'Int', query: 'String' } },
    tv: {
      __type: 'TV',
      __args: { id: 'String!', page: 'Int', query: 'String' },
    },
    tvEpisode: {
      __type: 'TVEpisode',
      __args: {
        episode_number: 'String!',
        id: 'String!',
        page: 'Int',
        query: 'String',
        season_number: 'String!',
      },
    },
    tvSeason: {
      __type: 'TVSeason',
      __args: {
        id: 'String!',
        page: 'Int',
        query: 'String',
        season_number: 'String!',
      },
    },
  },
  subscription: {},
} as const

export interface AggregateCast {
  __typename?: 'AggregateCast'
  adult?: Maybe<ScalarsEnums['Boolean']>
  gender?: Maybe<ScalarsEnums['Int']>
  id?: Maybe<ScalarsEnums['Int']>
  known_for_department?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
  order?: Maybe<ScalarsEnums['Int']>
  original_name?: Maybe<ScalarsEnums['String']>
  popularity?: Maybe<ScalarsEnums['Int']>
  profile_path?: Maybe<ScalarsEnums['String']>
  roles?: Maybe<Array<Maybe<Role>>>
  total_episode_count?: Maybe<ScalarsEnums['Int']>
}

export interface AggregateCredits {
  __typename?: 'AggregateCredits'
  cast?: Maybe<Array<Maybe<AggregateCast>>>
  crew?: Maybe<Array<Maybe<AggregateCrew>>>
  id?: Maybe<ScalarsEnums['Int']>
}

export interface AggregateCrew {
  __typename?: 'AggregateCrew'
  adult?: Maybe<ScalarsEnums['Boolean']>
  department?: Maybe<ScalarsEnums['String']>
  gender?: Maybe<ScalarsEnums['Int']>
  id?: Maybe<ScalarsEnums['Int']>
  jobs?: Maybe<Array<Maybe<Job>>>
  known_for_department?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
  original_name?: Maybe<ScalarsEnums['String']>
  popularity?: Maybe<ScalarsEnums['Int']>
  profile_path?: Maybe<ScalarsEnums['String']>
  total_episode_count?: Maybe<ScalarsEnums['Int']>
}

export interface Cast {
  __typename?: 'Cast'
  adult?: Maybe<ScalarsEnums['Boolean']>
  cast_id?: Maybe<ScalarsEnums['Int']>
  character?: Maybe<ScalarsEnums['String']>
  credit_id?: Maybe<ScalarsEnums['String']>
  gender?: Maybe<ScalarsEnums['Int']>
  id?: Maybe<ScalarsEnums['Int']>
  known_for_department?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
  order?: Maybe<ScalarsEnums['Int']>
  original_name?: Maybe<ScalarsEnums['String']>
  popularity?: Maybe<ScalarsEnums['Int']>
  profile_path?: Maybe<ScalarsEnums['String']>
}

export interface CombinedCast {
  __typename?: 'CombinedCast'
  adult?: Maybe<ScalarsEnums['Boolean']>
  backdrop_path?: Maybe<ScalarsEnums['String']>
  character?: Maybe<ScalarsEnums['String']>
  credit_id?: Maybe<ScalarsEnums['String']>
  episode_count?: Maybe<ScalarsEnums['Int']>
  first_air_date?: Maybe<ScalarsEnums['String']>
  genre_ids?: Maybe<Array<Maybe<ScalarsEnums['Int']>>>
  id?: Maybe<ScalarsEnums['Int']>
  media_type?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
  order?: Maybe<ScalarsEnums['Int']>
  origin_country?: Maybe<Array<Maybe<ScalarsEnums['String']>>>
  original_language?: Maybe<ScalarsEnums['String']>
  original_name?: Maybe<ScalarsEnums['String']>
  original_title?: Maybe<ScalarsEnums['String']>
  overview?: Maybe<ScalarsEnums['String']>
  popularity?: Maybe<ScalarsEnums['Int']>
  poster_path?: Maybe<ScalarsEnums['String']>
  release_date?: Maybe<ScalarsEnums['String']>
  title?: Maybe<ScalarsEnums['String']>
  video?: Maybe<ScalarsEnums['Boolean']>
  vote_average?: Maybe<ScalarsEnums['Float']>
  vote_count?: Maybe<ScalarsEnums['Int']>
}

export interface CombinedCredits {
  __typename?: 'CombinedCredits'
  cast?: Maybe<Array<Maybe<CombinedCast>>>
  crew?: Maybe<Array<Maybe<CombinedCrew>>>
  id?: Maybe<ScalarsEnums['Int']>
}

export interface CombinedCrew {
  __typename?: 'CombinedCrew'
  adult?: Maybe<ScalarsEnums['Boolean']>
  backdrop_path?: Maybe<ScalarsEnums['String']>
  credit_id?: Maybe<ScalarsEnums['String']>
  department?: Maybe<ScalarsEnums['String']>
  episode_count?: Maybe<ScalarsEnums['Int']>
  first_air_date?: Maybe<ScalarsEnums['String']>
  genre_ids?: Maybe<Array<Maybe<ScalarsEnums['Int']>>>
  id?: Maybe<ScalarsEnums['Int']>
  job?: Maybe<ScalarsEnums['String']>
  media_type?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
  origin_country?: Maybe<Array<Maybe<ScalarsEnums['String']>>>
  original_language?: Maybe<ScalarsEnums['String']>
  original_name?: Maybe<ScalarsEnums['String']>
  original_title?: Maybe<ScalarsEnums['String']>
  overview?: Maybe<ScalarsEnums['String']>
  popularity?: Maybe<ScalarsEnums['Int']>
  poster_path?: Maybe<ScalarsEnums['String']>
  release_date?: Maybe<ScalarsEnums['String']>
  title?: Maybe<ScalarsEnums['String']>
  video?: Maybe<ScalarsEnums['Boolean']>
  vote_average?: Maybe<ScalarsEnums['Float']>
  vote_count?: Maybe<ScalarsEnums['Int']>
}

export interface Credits {
  __typename?: 'Credits'
  cast?: Maybe<Array<Maybe<Cast>>>
  crew?: Maybe<Array<Maybe<Crew>>>
  id?: Maybe<ScalarsEnums['Int']>
}

export interface Crew {
  __typename?: 'Crew'
  adult?: Maybe<ScalarsEnums['Boolean']>
  credit_id?: Maybe<ScalarsEnums['String']>
  department?: Maybe<ScalarsEnums['String']>
  gender?: Maybe<ScalarsEnums['Int']>
  id?: Maybe<ScalarsEnums['Int']>
  job?: Maybe<ScalarsEnums['String']>
  known_for_department?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
  original_name?: Maybe<ScalarsEnums['String']>
  popularity?: Maybe<ScalarsEnums['Int']>
  profile_path?: Maybe<ScalarsEnums['String']>
}

export interface Episode {
  __typename?: 'Episode'
  air_date?: Maybe<ScalarsEnums['String']>
  crew?: Maybe<Array<Maybe<Crew>>>
  episode_number?: Maybe<ScalarsEnums['Int']>
  guest_stars?: Maybe<Array<Maybe<Cast>>>
  id?: Maybe<ScalarsEnums['Int']>
  name?: Maybe<ScalarsEnums['String']>
  overview?: Maybe<ScalarsEnums['String']>
  production_code?: Maybe<ScalarsEnums['String']>
  runtime?: Maybe<ScalarsEnums['Int']>
  season_number?: Maybe<ScalarsEnums['Int']>
  show_id?: Maybe<ScalarsEnums['Int']>
  still_path?: Maybe<ScalarsEnums['String']>
  vote_average?: Maybe<ScalarsEnums['Float']>
  vote_count?: Maybe<ScalarsEnums['Int']>
}

export interface ExternalIds {
  __typename?: 'ExternalIds'
  facebook_id?: Maybe<ScalarsEnums['String']>
  freebase_id?: Maybe<ScalarsEnums['String']>
  freebase_mid?: Maybe<ScalarsEnums['String']>
  id?: Maybe<ScalarsEnums['Int']>
  imdb_id?: Maybe<ScalarsEnums['String']>
  instagram_id?: Maybe<ScalarsEnums['String']>
  tvdb_id?: Maybe<ScalarsEnums['Int']>
  tvrage_id?: Maybe<ScalarsEnums['Int']>
  twitter_id?: Maybe<ScalarsEnums['String']>
  wikidata_id?: Maybe<ScalarsEnums['String']>
}

export interface Genre {
  __typename?: 'Genre'
  id?: Maybe<ScalarsEnums['Int']>
  name?: Maybe<ScalarsEnums['String']>
}

export interface Image {
  __typename?: 'Image'
  aspect_ratio?: Maybe<ScalarsEnums['Int']>
  file_path?: Maybe<ScalarsEnums['String']>
  height?: Maybe<ScalarsEnums['Int']>
  iso_639_1?: Maybe<ScalarsEnums['String']>
  vote_average?: Maybe<ScalarsEnums['Float']>
  vote_count?: Maybe<ScalarsEnums['Int']>
  width?: Maybe<ScalarsEnums['Int']>
}

export interface Images {
  __typename?: 'Images'
  backdrops?: Maybe<Array<Maybe<Image>>>
  id?: Maybe<ScalarsEnums['Int']>
  logos?: Maybe<Array<Maybe<Image>>>
  posters?: Maybe<Array<Maybe<Image>>>
  profiles?: Maybe<Array<Maybe<Image>>>
  stills?: Maybe<Array<Maybe<Image>>>
}

export interface Job {
  __typename?: 'Job'
  credit_id?: Maybe<ScalarsEnums['String']>
  episode_count?: Maybe<ScalarsEnums['Int']>
  job?: Maybe<ScalarsEnums['String']>
}

export interface Movie {
  __typename?: 'Movie'
  adult?: Maybe<ScalarsEnums['Boolean']>
  backdrop_path?: Maybe<ScalarsEnums['String']>
  belongs_to_collection?: Maybe<ScalarsEnums['Unknown']>
  budget?: Maybe<ScalarsEnums['Float']>
  credits?: Maybe<Credits>
  genres?: Maybe<Array<Maybe<Genre>>>
  homepage?: Maybe<ScalarsEnums['String']>
  id?: Maybe<ScalarsEnums['Int']>
  images?: Maybe<Images>
  imdb_id?: Maybe<ScalarsEnums['String']>
  original_language?: Maybe<ScalarsEnums['String']>
  original_title?: Maybe<ScalarsEnums['String']>
  overview?: Maybe<ScalarsEnums['String']>
  popularity?: Maybe<ScalarsEnums['Int']>
  poster_path?: Maybe<ScalarsEnums['String']>
  production_companies?: Maybe<Array<Maybe<ProductionCompany>>>
  production_countries?: Maybe<Array<Maybe<ProductionCountry>>>
  release_date?: Maybe<ScalarsEnums['String']>
  release_dates?: Maybe<ReleaseDates>
  revenue?: Maybe<ScalarsEnums['Float']>
  runtime?: Maybe<ScalarsEnums['Int']>
  spoken_languages?: Maybe<Array<Maybe<SpokenLanguage>>>
  status?: Maybe<ScalarsEnums['String']>
  tagline?: Maybe<ScalarsEnums['String']>
  title?: Maybe<ScalarsEnums['String']>
  video?: Maybe<ScalarsEnums['Boolean']>
  videos?: Maybe<Videos>
  vote_average?: Maybe<ScalarsEnums['Float']>
  vote_count?: Maybe<ScalarsEnums['Int']>
}

export interface Network {
  __typename?: 'Network'
  id?: Maybe<ScalarsEnums['Int']>
  logo_path?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
  origin_country?: Maybe<ScalarsEnums['String']>
}

export interface Person {
  __typename?: 'Person'
  adult?: Maybe<ScalarsEnums['Boolean']>
  also_known_as?: Maybe<Array<Maybe<ScalarsEnums['String']>>>
  biography?: Maybe<ScalarsEnums['String']>
  birthday?: Maybe<ScalarsEnums['String']>
  combined_credits?: Maybe<CombinedCredits>
  deathday?: Maybe<ScalarsEnums['String']>
  gender?: Maybe<ScalarsEnums['Int']>
  homepage?: Maybe<ScalarsEnums['String']>
  id?: Maybe<ScalarsEnums['Int']>
  images?: Maybe<Images>
  imdb_id?: Maybe<ScalarsEnums['String']>
  known_for_department?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
  place_of_birth?: Maybe<ScalarsEnums['String']>
  popularity?: Maybe<ScalarsEnums['Int']>
  profile_path?: Maybe<ScalarsEnums['String']>
}

export interface ProductionCompany {
  __typename?: 'ProductionCompany'
  id?: Maybe<ScalarsEnums['Int']>
  logo_path?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
  origin_country?: Maybe<ScalarsEnums['String']>
}

export interface ProductionCountry {
  __typename?: 'ProductionCountry'
  iso_3166_1?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
}

export interface ReleaseDate {
  __typename?: 'ReleaseDate'
  certification?: Maybe<ScalarsEnums['String']>
  descriptors?: Maybe<Array<Maybe<ScalarsEnums['String']>>>
  iso_639_1?: Maybe<ScalarsEnums['String']>
  note?: Maybe<ScalarsEnums['String']>
  release_date?: Maybe<ScalarsEnums['String']>
  type?: Maybe<ScalarsEnums['Int']>
}

export interface ReleaseDateResult {
  __typename?: 'ReleaseDateResult'
  iso_3166_1?: Maybe<ScalarsEnums['String']>
  release_dates?: Maybe<Array<Maybe<ReleaseDate>>>
}

export interface ReleaseDates {
  __typename?: 'ReleaseDates'
  id?: Maybe<ScalarsEnums['Int']>
  results?: Maybe<Array<Maybe<ReleaseDateResult>>>
}

export interface Role {
  __typename?: 'Role'
  character?: Maybe<ScalarsEnums['String']>
  credit_id?: Maybe<ScalarsEnums['String']>
  episode_count?: Maybe<ScalarsEnums['Int']>
}

export interface Search {
  __typename?: 'Search'
  page?: Maybe<ScalarsEnums['Int']>
  results?: Maybe<Array<Maybe<SearchResult>>>
  total_pages?: Maybe<ScalarsEnums['Int']>
  total_results?: Maybe<ScalarsEnums['Int']>
}

export interface SearchResult {
  __typename?: 'SearchResult'
  adult?: Maybe<ScalarsEnums['Boolean']>
  backdrop_path?: Maybe<ScalarsEnums['String']>
  first_air_date?: Maybe<ScalarsEnums['String']>
  genre_ids?: Maybe<Array<Maybe<ScalarsEnums['Int']>>>
  id?: Maybe<ScalarsEnums['Int']>
  media_type?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
  origin_country?: Maybe<Array<Maybe<ScalarsEnums['String']>>>
  original_language?: Maybe<ScalarsEnums['String']>
  original_name?: Maybe<ScalarsEnums['String']>
  original_title?: Maybe<ScalarsEnums['String']>
  overview?: Maybe<ScalarsEnums['String']>
  popularity?: Maybe<ScalarsEnums['Int']>
  poster_path?: Maybe<ScalarsEnums['String']>
  profile_path?: Maybe<ScalarsEnums['String']>
  release_date?: Maybe<ScalarsEnums['String']>
  title?: Maybe<ScalarsEnums['String']>
  video?: Maybe<ScalarsEnums['Boolean']>
  vote_average?: Maybe<ScalarsEnums['Float']>
  vote_count?: Maybe<ScalarsEnums['Int']>
}

export interface Season {
  __typename?: 'Season'
  air_date?: Maybe<ScalarsEnums['String']>
  episode_count?: Maybe<ScalarsEnums['Int']>
  id?: Maybe<ScalarsEnums['Int']>
  name?: Maybe<ScalarsEnums['String']>
  overview?: Maybe<ScalarsEnums['String']>
  poster_path?: Maybe<ScalarsEnums['String']>
  season_number?: Maybe<ScalarsEnums['Int']>
  vote_average?: Maybe<ScalarsEnums['Float']>
}

export interface SpokenLanguage {
  __typename?: 'SpokenLanguage'
  english_name?: Maybe<ScalarsEnums['String']>
  iso_639_1?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
}

export interface TV {
  __typename?: 'TV'
  adult?: Maybe<ScalarsEnums['Boolean']>
  aggregate_credits?: Maybe<AggregateCredits>
  backdrop_path?: Maybe<ScalarsEnums['String']>
  episode_run_time?: Maybe<Array<Maybe<ScalarsEnums['Int']>>>
  external_ids?: Maybe<ExternalIds>
  first_air_date?: Maybe<ScalarsEnums['String']>
  genres?: Maybe<Array<Maybe<Genre>>>
  homepage?: Maybe<ScalarsEnums['String']>
  id?: Maybe<ScalarsEnums['Int']>
  images?: Maybe<Images>
  in_production?: Maybe<ScalarsEnums['Boolean']>
  languages?: Maybe<Array<Maybe<ScalarsEnums['String']>>>
  last_air_date?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
  networks?: Maybe<Array<Maybe<Network>>>
  number_of_episodes?: Maybe<ScalarsEnums['Int']>
  number_of_seasons?: Maybe<ScalarsEnums['Int']>
  origin_country?: Maybe<Array<Maybe<ScalarsEnums['String']>>>
  original_language?: Maybe<ScalarsEnums['String']>
  original_name?: Maybe<ScalarsEnums['String']>
  overview?: Maybe<ScalarsEnums['String']>
  popularity?: Maybe<ScalarsEnums['Int']>
  poster_path?: Maybe<ScalarsEnums['String']>
  production_companies?: Maybe<Array<Maybe<ProductionCompany>>>
  production_countries?: Maybe<Array<Maybe<ProductionCountry>>>
  seasons?: Maybe<Array<Maybe<Season>>>
  spoken_languages?: Maybe<Array<Maybe<SpokenLanguage>>>
  status?: Maybe<ScalarsEnums['String']>
  tagline?: Maybe<ScalarsEnums['String']>
  type?: Maybe<ScalarsEnums['String']>
  videos?: Maybe<Videos>
  vote_average?: Maybe<ScalarsEnums['Float']>
  vote_count?: Maybe<ScalarsEnums['Int']>
}

export interface TVEpisode {
  __typename?: 'TVEpisode'
  air_date?: Maybe<ScalarsEnums['String']>
  crew?: Maybe<Array<Maybe<Crew>>>
  episode_number?: Maybe<ScalarsEnums['Int']>
  guest_stars?: Maybe<Array<Maybe<Cast>>>
  id?: Maybe<ScalarsEnums['Int']>
  images?: Maybe<Images>
  name?: Maybe<ScalarsEnums['String']>
  overview?: Maybe<ScalarsEnums['String']>
  production_code?: Maybe<ScalarsEnums['String']>
  runtime?: Maybe<ScalarsEnums['Int']>
  season_number?: Maybe<ScalarsEnums['Int']>
  still_path?: Maybe<ScalarsEnums['String']>
  videos?: Maybe<Videos>
  vote_average?: Maybe<ScalarsEnums['Float']>
  vote_count?: Maybe<ScalarsEnums['Int']>
}

export interface TVSeason {
  __typename?: 'TVSeason'
  _id?: Maybe<ScalarsEnums['String']>
  air_date?: Maybe<ScalarsEnums['String']>
  credits?: Maybe<Credits>
  episodes?: Maybe<Array<Maybe<Episode>>>
  id?: Maybe<ScalarsEnums['Int']>
  images?: Maybe<Images>
  name?: Maybe<ScalarsEnums['String']>
  overview?: Maybe<ScalarsEnums['String']>
  poster_path?: Maybe<ScalarsEnums['String']>
  season_number?: Maybe<ScalarsEnums['Int']>
  videos?: Maybe<Videos>
  vote_average?: Maybe<ScalarsEnums['Float']>
}

export interface VideoResult {
  __typename?: 'VideoResult'
  id?: Maybe<ScalarsEnums['String']>
  iso_639_1?: Maybe<ScalarsEnums['String']>
  iso_3166_1?: Maybe<ScalarsEnums['String']>
  key?: Maybe<ScalarsEnums['String']>
  name?: Maybe<ScalarsEnums['String']>
  official?: Maybe<ScalarsEnums['Boolean']>
  published_at?: Maybe<ScalarsEnums['String']>
  site?: Maybe<ScalarsEnums['String']>
  size?: Maybe<ScalarsEnums['Int']>
  type?: Maybe<ScalarsEnums['String']>
}

export interface Videos {
  __typename?: 'Videos'
  id?: Maybe<ScalarsEnums['Int']>
  results?: Maybe<Array<Maybe<VideoResult>>>
}

export interface Mutation {
  __typename?: 'Mutation'
}

export interface Query {
  __typename?: 'Query'
  movie: (args: {
    id: Scalars['String']
    page?: Maybe<Scalars['Int']>
    query?: Maybe<Scalars['String']>
  }) => Maybe<Movie>
  person: (args: {
    filter?: Maybe<Scalars['String']>
    id: Scalars['String']
    page?: Maybe<Scalars['Int']>
    query?: Maybe<Scalars['String']>
  }) => Maybe<Person>
  search: (args?: {
    page?: Maybe<Scalars['Int']>
    query?: Maybe<Scalars['String']>
  }) => Maybe<Search>
  tv: (args: {
    id: Scalars['String']
    page?: Maybe<Scalars['Int']>
    query?: Maybe<Scalars['String']>
  }) => Maybe<TV>
  tvEpisode: (args: {
    episode_number: Scalars['String']
    id: Scalars['String']
    page?: Maybe<Scalars['Int']>
    query?: Maybe<Scalars['String']>
    season_number: Scalars['String']
  }) => Maybe<TVEpisode>
  tvSeason: (args: {
    id: Scalars['String']
    page?: Maybe<Scalars['Int']>
    query?: Maybe<Scalars['String']>
    season_number: Scalars['String']
  }) => Maybe<TVSeason>
}

export interface Subscription {
  __typename?: 'Subscription'
}

export interface SchemaObjectTypes {
  AggregateCast: AggregateCast
  AggregateCredits: AggregateCredits
  AggregateCrew: AggregateCrew
  Cast: Cast
  CombinedCast: CombinedCast
  CombinedCredits: CombinedCredits
  CombinedCrew: CombinedCrew
  Credits: Credits
  Crew: Crew
  Episode: Episode
  ExternalIds: ExternalIds
  Genre: Genre
  Image: Image
  Images: Images
  Job: Job
  Movie: Movie
  Mutation: Mutation
  Network: Network
  Person: Person
  ProductionCompany: ProductionCompany
  ProductionCountry: ProductionCountry
  Query: Query
  ReleaseDate: ReleaseDate
  ReleaseDateResult: ReleaseDateResult
  ReleaseDates: ReleaseDates
  Role: Role
  Search: Search
  SearchResult: SearchResult
  Season: Season
  SpokenLanguage: SpokenLanguage
  Subscription: Subscription
  TV: TV
  TVEpisode: TVEpisode
  TVSeason: TVSeason
  VideoResult: VideoResult
  Videos: Videos
}
export type SchemaObjectTypesNames =
  | 'AggregateCast'
  | 'AggregateCredits'
  | 'AggregateCrew'
  | 'Cast'
  | 'CombinedCast'
  | 'CombinedCredits'
  | 'CombinedCrew'
  | 'Credits'
  | 'Crew'
  | 'Episode'
  | 'ExternalIds'
  | 'Genre'
  | 'Image'
  | 'Images'
  | 'Job'
  | 'Movie'
  | 'Mutation'
  | 'Network'
  | 'Person'
  | 'ProductionCompany'
  | 'ProductionCountry'
  | 'Query'
  | 'ReleaseDate'
  | 'ReleaseDateResult'
  | 'ReleaseDates'
  | 'Role'
  | 'Search'
  | 'SearchResult'
  | 'Season'
  | 'SpokenLanguage'
  | 'Subscription'
  | 'TV'
  | 'TVEpisode'
  | 'TVSeason'
  | 'VideoResult'
  | 'Videos'

export interface GeneratedSchema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined
}

export interface ScalarsEnums extends MakeNullable<Scalars> {}
