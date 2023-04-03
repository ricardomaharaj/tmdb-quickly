import { SearchResults } from '@/types/search-results'
import { Movie, MovieCredits } from '@/types/movie'
import { TV } from '@/types/tv'
import { Fetcher } from '@/util/fetcher'

const api_key = process.env.TMDB!

const tmdbFetcher = new Fetcher('https://api.themoviedb.org/3/', { api_key })

export const tmdbApi = {
  trending: async () => {
    return await tmdbFetcher.get<SearchResults>('trending/all/week')
  },
  search: async (args: { query: string; page: string }) => {
    const { query, page } = args
    return await tmdbFetcher.get<SearchResults>('search/multi', { query, page })
  },
  getMovie: async (args: { id: string }) => {
    const { id } = args
    return await tmdbFetcher.get<Movie>(`movie/${id}`)
  },
  movie: {
    credits: async (args: { id: string }) => {
      const { id } = args
      return await tmdbFetcher.get<MovieCredits>(`movie/${id}/credits`)
    },
  },
  tv: async (args: { id: string }) => {
    const { id } = args
    return await tmdbFetcher.get<TV>(`tv/${id}`)
  },
}
