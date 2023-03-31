import { SearchResults } from "@/types/search-results"
import { Movie } from "@/types/movie"
import { TV } from "@/types/tv"
import { Fetcher } from "@/util/fetcher"

const api_key = process.env.TMDB!

const tmdbFetcher = new Fetcher("https://api.themoviedb.org/3/", { api_key })

export const tmdbApi = {
  trending: async () => {
    const x = await tmdbFetcher.get<SearchResults>("trending/all/week")
    return x
  },
  search: async (args: { query: string; page: string }) => {
    const { query, page } = args
    const x = await tmdbFetcher.get<SearchResults>("search/multi", {
      query,
      page,
    })
    return x
  },
  movie: async (args: { id: String }) => {
    const { id } = args
    const x = await tmdbFetcher.get<Movie>(`movie/${id}`)
    return x
  },
  tv: async (args: { id: String }) => {
    const { id } = args
    const x = await tmdbFetcher.get<TV>(`tv/${id}`)
    return x
  },
}
