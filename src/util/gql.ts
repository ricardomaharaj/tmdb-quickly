import { gql } from 'urql'
import * as Urql from 'urql'
export type Maybe<T> = T | null
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
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Any: any
}

export type SearchResults = {
  __typename?: 'SearchResults'
  page?: Maybe<Scalars['Int']>
  results?: Maybe<Array<Maybe<SearchResult>>>
  total_pages?: Maybe<Scalars['Int']>
  total_results?: Maybe<Scalars['Int']>
}

export type SearchResult = {
  __typename?: 'SearchResult'
  adult?: Maybe<Scalars['Boolean']>
  backdrop_path?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  original_language?: Maybe<Scalars['String']>
  original_title?: Maybe<Scalars['String']>
  overview?: Maybe<Scalars['String']>
  poster_path?: Maybe<Scalars['String']>
  media_type?: Maybe<Scalars['String']>
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>
  popularity?: Maybe<Scalars['Int']>
  release_date?: Maybe<Scalars['String']>
  video?: Maybe<Scalars['Boolean']>
  vote_average?: Maybe<Scalars['Float']>
  vote_count?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  original_name?: Maybe<Scalars['String']>
  first_air_date?: Maybe<Scalars['String']>
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>
  gender?: Maybe<Scalars['Int']>
  known_for_department?: Maybe<Scalars['String']>
  profile_path?: Maybe<Scalars['String']>
  known_for?: Maybe<Array<Maybe<KnownFor>>>
}

export type KnownFor = {
  __typename?: 'KnownFor'
  adult?: Maybe<Scalars['Boolean']>
  backdrop_path?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  original_language?: Maybe<Scalars['String']>
  original_title?: Maybe<Scalars['String']>
  overview?: Maybe<Scalars['String']>
  poster_path?: Maybe<Scalars['String']>
  media_type?: Maybe<Scalars['String']>
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>
  popularity?: Maybe<Scalars['Int']>
  release_date?: Maybe<Scalars['String']>
  video?: Maybe<Scalars['Boolean']>
  vote_average?: Maybe<Scalars['Float']>
  vote_count?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  original_name?: Maybe<Scalars['String']>
  first_air_date?: Maybe<Scalars['String']>
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type Movie = {
  __typename?: 'Movie'
  adult?: Maybe<Scalars['Boolean']>
  backdrop_path?: Maybe<Scalars['String']>
  belongs_to_collection?: Maybe<BelongsToCollection>
  budget?: Maybe<Scalars['Int']>
  genres?: Maybe<Array<Maybe<Genre>>>
  homepage?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  imdb_id?: Maybe<Scalars['String']>
  original_language?: Maybe<Scalars['String']>
  original_title?: Maybe<Scalars['String']>
  overview?: Maybe<Scalars['String']>
  popularity?: Maybe<Scalars['Int']>
  poster_path?: Maybe<Scalars['String']>
  production_companies?: Maybe<Array<Maybe<ProductionCompany>>>
  production_countries?: Maybe<Array<Maybe<ProductionCountry>>>
  release_date?: Maybe<Scalars['String']>
  revenue?: Maybe<Scalars['Int']>
  runtime?: Maybe<Scalars['Int']>
  spoken_languages?: Maybe<Array<Maybe<SpokenLanguage>>>
  status?: Maybe<Scalars['String']>
  tagline?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  video?: Maybe<Scalars['Boolean']>
  vote_average?: Maybe<Scalars['Float']>
  vote_count?: Maybe<Scalars['Int']>
  credits?: Maybe<Credits>
  images?: Maybe<Images>
  videos?: Maybe<Videos>
}

export type BelongsToCollection = {
  __typename?: 'BelongsToCollection'
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  poster_path?: Maybe<Scalars['String']>
  backdrop_path?: Maybe<Scalars['String']>
}

export type Credits = {
  __typename?: 'Credits'
  cast?: Maybe<Array<Maybe<Cast>>>
  crew?: Maybe<Array<Maybe<Crew>>>
}

export type Cast = {
  __typename?: 'Cast'
  adult?: Maybe<Scalars['Boolean']>
  gender?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  known_for_department?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  original_name?: Maybe<Scalars['String']>
  popularity?: Maybe<Scalars['Int']>
  profile_path?: Maybe<Scalars['String']>
  cast_id?: Maybe<Scalars['Int']>
  character?: Maybe<Scalars['String']>
  credit_id?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
}

export type Crew = {
  __typename?: 'Crew'
  adult?: Maybe<Scalars['Boolean']>
  gender?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  known_for_department?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  original_name?: Maybe<Scalars['String']>
  popularity?: Maybe<Scalars['Int']>
  profile_path?: Maybe<Scalars['String']>
  credit_id?: Maybe<Scalars['String']>
  department?: Maybe<Scalars['String']>
  job?: Maybe<Scalars['String']>
}

export type Genre = {
  __typename?: 'Genre'
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
}

export type Images = {
  __typename?: 'Images'
  backdrops?: Maybe<Array<Maybe<Image>>>
  logos?: Maybe<Array<Maybe<Image>>>
  posters?: Maybe<Array<Maybe<Image>>>
}

export type Image = {
  __typename?: 'Image'
  aspect_ratio?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  iso_639_1?: Maybe<Scalars['String']>
  file_path?: Maybe<Scalars['String']>
  vote_average?: Maybe<Scalars['Float']>
  vote_count?: Maybe<Scalars['Int']>
  width?: Maybe<Scalars['Int']>
}

export type ProductionCompany = {
  __typename?: 'ProductionCompany'
  id?: Maybe<Scalars['Int']>
  logo_path?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  origin_country?: Maybe<Scalars['String']>
}

export type ProductionCountry = {
  __typename?: 'ProductionCountry'
  iso_3166_1?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type SpokenLanguage = {
  __typename?: 'SpokenLanguage'
  english_name?: Maybe<Scalars['String']>
  iso_639_1?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type Videos = {
  __typename?: 'Videos'
  results?: Maybe<Array<Maybe<VideoResult>>>
}

export type VideoResult = {
  __typename?: 'VideoResult'
  iso_639_1?: Maybe<Scalars['String']>
  iso_3166_1?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  key?: Maybe<Scalars['String']>
  site?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Int']>
  type?: Maybe<Scalars['String']>
  official?: Maybe<Scalars['Boolean']>
  published_at?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
}

export type Tv = {
  __typename?: 'TV'
  adult?: Maybe<Scalars['Boolean']>
  backdrop_path?: Maybe<Scalars['String']>
  created_by?: Maybe<Array<Maybe<CreatedBy>>>
  episode_run_time?: Maybe<Array<Maybe<Scalars['Int']>>>
  first_air_date?: Maybe<Scalars['String']>
  genres?: Maybe<Array<Maybe<Genre>>>
  homepage?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  in_production?: Maybe<Scalars['Boolean']>
  languages?: Maybe<Array<Maybe<Scalars['String']>>>
  last_air_date?: Maybe<Scalars['String']>
  last_episode_to_air?: Maybe<LastEpisodeToAir>
  name?: Maybe<Scalars['String']>
  networks?: Maybe<Array<Maybe<Network>>>
  number_of_episodes?: Maybe<Scalars['Int']>
  number_of_seasons?: Maybe<Scalars['Int']>
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>
  original_language?: Maybe<Scalars['String']>
  original_name?: Maybe<Scalars['String']>
  overview?: Maybe<Scalars['String']>
  popularity?: Maybe<Scalars['Int']>
  poster_path?: Maybe<Scalars['String']>
  production_companies?: Maybe<Array<Maybe<ProductionCompany>>>
  production_countries?: Maybe<Array<Maybe<ProductionCountry>>>
  seasons?: Maybe<Array<Maybe<TvSeason>>>
  spoken_languages?: Maybe<Array<Maybe<SpokenLanguage>>>
  status?: Maybe<Scalars['String']>
  tagline?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  vote_average?: Maybe<Scalars['Float']>
  vote_count?: Maybe<Scalars['Int']>
  aggregate_credits?: Maybe<AggregateCredits>
  images?: Maybe<Images>
  videos?: Maybe<Videos>
}

export type AggregateCredits = {
  __typename?: 'AggregateCredits'
  cast?: Maybe<Array<Maybe<AggregateCast>>>
  crew?: Maybe<Array<Maybe<AggregateCrew>>>
}

export type AggregateCast = {
  __typename?: 'AggregateCast'
  adult?: Maybe<Scalars['Boolean']>
  gender?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  known_for_department?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  original_name?: Maybe<Scalars['String']>
  popularity?: Maybe<Scalars['Int']>
  profile_path?: Maybe<Scalars['String']>
  roles?: Maybe<Array<Maybe<Role>>>
  total_episode_count?: Maybe<Scalars['Int']>
  order?: Maybe<Scalars['Int']>
}

export type Role = {
  __typename?: 'Role'
  credit_id?: Maybe<Scalars['String']>
  character?: Maybe<Scalars['String']>
  episode_count?: Maybe<Scalars['Int']>
}

export type AggregateCrew = {
  __typename?: 'AggregateCrew'
  adult?: Maybe<Scalars['Boolean']>
  gender?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  known_for_department?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  original_name?: Maybe<Scalars['String']>
  popularity?: Maybe<Scalars['Int']>
  profile_path?: Maybe<Scalars['String']>
  jobs?: Maybe<Array<Maybe<Job>>>
  department?: Maybe<Scalars['String']>
  total_episode_count?: Maybe<Scalars['Int']>
}

export type Job = {
  __typename?: 'Job'
  credit_id?: Maybe<Scalars['String']>
  job?: Maybe<Scalars['String']>
  episode_count?: Maybe<Scalars['Int']>
}

export type CreatedBy = {
  __typename?: 'CreatedBy'
  id?: Maybe<Scalars['Int']>
  credit_id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  gender?: Maybe<Scalars['Int']>
  profile_path?: Maybe<Scalars['String']>
}

export type LastEpisodeToAir = {
  __typename?: 'LastEpisodeToAir'
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  overview?: Maybe<Scalars['String']>
  vote_average?: Maybe<Scalars['Float']>
  vote_count?: Maybe<Scalars['Int']>
  air_date?: Maybe<Scalars['String']>
  episode_number?: Maybe<Scalars['Int']>
  production_code?: Maybe<Scalars['String']>
  runtime?: Maybe<Scalars['Int']>
  season_number?: Maybe<Scalars['Int']>
  show_id?: Maybe<Scalars['Int']>
  still_path?: Maybe<Scalars['String']>
}

export type Network = {
  __typename?: 'Network'
  id?: Maybe<Scalars['Int']>
  logo_path?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  origin_country?: Maybe<Scalars['String']>
}

export type TvSeason = {
  __typename?: 'TVSeason'
  air_date?: Maybe<Scalars['String']>
  episode_count?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  overview?: Maybe<Scalars['String']>
  poster_path?: Maybe<Scalars['String']>
  season_number?: Maybe<Scalars['Int']>
}

export type Season = {
  __typename?: 'Season'
  _id?: Maybe<Scalars['String']>
  air_date?: Maybe<Scalars['String']>
  episodes?: Maybe<Array<Maybe<SeasonEpisode>>>
  name?: Maybe<Scalars['String']>
  overview?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  poster_path?: Maybe<Scalars['String']>
  season_number?: Maybe<Scalars['Int']>
  credits?: Maybe<Credits>
  images?: Maybe<Images>
  videos?: Maybe<Videos>
}

export type SeasonEpisode = {
  __typename?: 'SeasonEpisode'
  air_date?: Maybe<Scalars['String']>
  episode_number?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  overview?: Maybe<Scalars['String']>
  production_code?: Maybe<Scalars['String']>
  runtime?: Maybe<Scalars['Int']>
  season_number?: Maybe<Scalars['Int']>
  show_id?: Maybe<Scalars['Int']>
  still_path?: Maybe<Scalars['String']>
  vote_average?: Maybe<Scalars['Float']>
  vote_count?: Maybe<Scalars['Int']>
  crew?: Maybe<Array<Maybe<Crew>>>
  guest_stars?: Maybe<Array<Maybe<GuestStar>>>
}

export type GuestStar = {
  __typename?: 'GuestStar'
  character?: Maybe<Scalars['String']>
  credit_id?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  adult?: Maybe<Scalars['Boolean']>
  gender?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  known_for_department?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  original_name?: Maybe<Scalars['String']>
  popularity?: Maybe<Scalars['Int']>
  profile_path?: Maybe<Scalars['String']>
}

export type Episode = {
  __typename?: 'Episode'
  air_date?: Maybe<Scalars['String']>
  crew?: Maybe<Array<Maybe<Crew>>>
  episode_number?: Maybe<Scalars['Int']>
  guest_stars?: Maybe<Array<Maybe<GuestStar>>>
  name?: Maybe<Scalars['String']>
  overview?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  production_code?: Maybe<Scalars['String']>
  runtime?: Maybe<Scalars['Int']>
  season_number?: Maybe<Scalars['Int']>
  still_path?: Maybe<Scalars['String']>
  vote_average?: Maybe<Scalars['Float']>
  vote_count?: Maybe<Scalars['Int']>
  credits?: Maybe<EpisodeCredits>
  images?: Maybe<EpisodeImages>
  videos?: Maybe<Videos>
}

export type EpisodeCredits = {
  __typename?: 'EpisodeCredits'
  cast?: Maybe<Array<Maybe<Cast>>>
  crew?: Maybe<Array<Maybe<Crew>>>
  guest_stars?: Maybe<Array<Maybe<GuestStar>>>
}

export type EpisodeImages = {
  __typename?: 'EpisodeImages'
  stills?: Maybe<Array<Maybe<Image>>>
}

export type Query = {
  __typename?: 'Query'
  search?: Maybe<SearchResults>
  movie?: Maybe<Movie>
  tv?: Maybe<Tv>
  season?: Maybe<Season>
  episode?: Maybe<Episode>
}

export type QuerySearchArgs = {
  query?: InputMaybe<Scalars['String']>
  page?: InputMaybe<Scalars['Int']>
}

export type QueryMovieArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryTvArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QuerySeasonArgs = {
  id?: InputMaybe<Scalars['ID']>
  season?: InputMaybe<Scalars['Int']>
}

export type QueryEpisodeArgs = {
  id?: InputMaybe<Scalars['ID']>
  season?: InputMaybe<Scalars['Int']>
  episode?: InputMaybe<Scalars['Int']>
}

export type SearchQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']>
  page?: InputMaybe<Scalars['Int']>
}>

export type SearchQuery = {
  __typename?: 'Query'
  search?: {
    __typename?: 'SearchResults'
    total_results?: number | null
    total_pages?: number | null
    results?: Array<{
      __typename?: 'SearchResult'
      id?: number | null
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      release_date?: string | null
      name?: string | null
      first_air_date?: string | null
      profile_path?: string | null
    } | null> | null
  } | null
}

export type MovieQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
}>

export type MovieQuery = {
  __typename?: 'Query'
  movie?: {
    __typename?: 'Movie'
    budget?: number | null
    overview?: string | null
    poster_path?: string | null
    release_date?: string | null
    revenue?: number | null
    runtime?: number | null
    status?: string | null
    tagline?: string | null
    title?: string | null
    genres?: Array<{ __typename?: 'Genre'; name?: string | null } | null> | null
    production_companies?: Array<{
      __typename?: 'ProductionCompany'
      name?: string | null
    } | null> | null
  } | null
}

export type MovieCreditsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
}>

export type MovieCreditsQuery = {
  __typename?: 'Query'
  movie?: {
    __typename?: 'Movie'
    credits?: {
      __typename?: 'Credits'
      cast?: Array<{
        __typename?: 'Cast'
        id?: number | null
        name?: string | null
        profile_path?: string | null
        character?: string | null
      } | null> | null
      crew?: Array<{
        __typename?: 'Crew'
        id?: number | null
        name?: string | null
        profile_path?: string | null
        job?: string | null
      } | null> | null
    } | null
  } | null
}

export type MovieImagesQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
}>

export type MovieImagesQuery = {
  __typename?: 'Query'
  movie?: {
    __typename?: 'Movie'
    images?: {
      __typename?: 'Images'
      posters?: Array<{
        __typename?: 'Image'
        iso_639_1?: string | null
        file_path?: string | null
      } | null> | null
      backdrops?: Array<{
        __typename?: 'Image'
        iso_639_1?: string | null
        file_path?: string | null
      } | null> | null
    } | null
  } | null
}

export type MovieVideosQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
}>

export type MovieVideosQuery = {
  __typename?: 'Query'
  movie?: {
    __typename?: 'Movie'
    videos?: {
      __typename?: 'Videos'
      results?: Array<{
        __typename?: 'VideoResult'
        type?: string | null
        key?: string | null
        name?: string | null
      } | null> | null
    } | null
  } | null
}

export type TvQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
}>

export type TvQuery = {
  __typename?: 'Query'
  tv?: {
    __typename?: 'TV'
    episode_run_time?: Array<number | null> | null
    first_air_date?: string | null
    last_air_date?: string | null
    name?: string | null
    number_of_episodes?: number | null
    number_of_seasons?: number | null
    overview?: string | null
    poster_path?: string | null
    status?: string | null
    tagline?: string | null
    type?: string | null
    genres?: Array<{ __typename?: 'Genre'; name?: string | null } | null> | null
    networks?: Array<{
      __typename?: 'Network'
      name?: string | null
    } | null> | null
    production_companies?: Array<{
      __typename?: 'ProductionCompany'
      name?: string | null
    } | null> | null
  } | null
}

export type TvCreditsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
}>

export type TvCreditsQuery = {
  __typename?: 'Query'
  tv?: {
    __typename?: 'TV'
    aggregate_credits?: {
      __typename?: 'AggregateCredits'
      cast?: Array<{
        __typename?: 'AggregateCast'
        id?: number | null
        name?: string | null
        profile_path?: string | null
        roles?: Array<{
          __typename?: 'Role'
          character?: string | null
          episode_count?: number | null
        } | null> | null
      } | null> | null
      crew?: Array<{
        __typename?: 'AggregateCrew'
        id?: number | null
        name?: string | null
        profile_path?: string | null
        jobs?: Array<{
          __typename?: 'Job'
          job?: string | null
          episode_count?: number | null
        } | null> | null
      } | null> | null
    } | null
  } | null
}

export const SearchDocument = gql`
  query Search($query: String, $page: Int) {
    search(query: $query, page: $page) {
      results {
        id
        title
        overview
        poster_path
        media_type
        release_date
        name
        first_air_date
        profile_path
      }
      total_results
      total_pages
    }
  }
`

export function useSearchQuery(
  options?: Omit<Urql.UseQueryArgs<SearchQueryVariables>, 'query'>
) {
  return Urql.useQuery<SearchQuery, SearchQueryVariables>({
    query: SearchDocument,
    ...options,
  })
}
export const MovieDocument = gql`
  query Movie($id: ID) {
    movie(id: $id) {
      budget
      genres {
        name
      }
      overview
      poster_path
      production_companies {
        name
      }
      release_date
      revenue
      runtime
      status
      tagline
      title
    }
  }
`

export function useMovieQuery(
  options?: Omit<Urql.UseQueryArgs<MovieQueryVariables>, 'query'>
) {
  return Urql.useQuery<MovieQuery, MovieQueryVariables>({
    query: MovieDocument,
    ...options,
  })
}
export const MovieCreditsDocument = gql`
  query MovieCredits($id: ID) {
    movie(id: $id) {
      credits {
        cast {
          id
          name
          profile_path
          character
        }
        crew {
          id
          name
          profile_path
          job
        }
      }
    }
  }
`

export function useMovieCreditsQuery(
  options?: Omit<Urql.UseQueryArgs<MovieCreditsQueryVariables>, 'query'>
) {
  return Urql.useQuery<MovieCreditsQuery, MovieCreditsQueryVariables>({
    query: MovieCreditsDocument,
    ...options,
  })
}
export const MovieImagesDocument = gql`
  query MovieImages($id: ID) {
    movie(id: $id) {
      images {
        posters {
          iso_639_1
          file_path
        }
        backdrops {
          iso_639_1
          file_path
        }
      }
    }
  }
`

export function useMovieImagesQuery(
  options?: Omit<Urql.UseQueryArgs<MovieImagesQueryVariables>, 'query'>
) {
  return Urql.useQuery<MovieImagesQuery, MovieImagesQueryVariables>({
    query: MovieImagesDocument,
    ...options,
  })
}
export const MovieVideosDocument = gql`
  query MovieVideos($id: ID) {
    movie(id: $id) {
      videos {
        results {
          type
          key
          name
        }
      }
    }
  }
`

export function useMovieVideosQuery(
  options?: Omit<Urql.UseQueryArgs<MovieVideosQueryVariables>, 'query'>
) {
  return Urql.useQuery<MovieVideosQuery, MovieVideosQueryVariables>({
    query: MovieVideosDocument,
    ...options,
  })
}
export const TvDocument = gql`
  query TV($id: ID) {
    tv(id: $id) {
      episode_run_time
      first_air_date
      genres {
        name
      }
      last_air_date
      name
      networks {
        name
      }
      number_of_episodes
      number_of_seasons
      overview
      poster_path
      production_companies {
        name
      }
      status
      tagline
      type
    }
  }
`

export function useTvQuery(
  options?: Omit<Urql.UseQueryArgs<TvQueryVariables>, 'query'>
) {
  return Urql.useQuery<TvQuery, TvQueryVariables>({
    query: TvDocument,
    ...options,
  })
}
export const TvCreditsDocument = gql`
  query TVCredits($id: ID) {
    tv(id: $id) {
      aggregate_credits {
        cast {
          id
          name
          profile_path
          roles {
            character
            episode_count
          }
        }
        crew {
          id
          name
          profile_path
          jobs {
            job
            episode_count
          }
        }
      }
    }
  }
`

export function useTvCreditsQuery(
  options?: Omit<Urql.UseQueryArgs<TvCreditsQueryVariables>, 'query'>
) {
  return Urql.useQuery<TvCreditsQuery, TvCreditsQueryVariables>({
    query: TvCreditsDocument,
    ...options,
  })
}
