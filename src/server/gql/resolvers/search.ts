import { tmdbFetch } from '~/server/util/tmdb-fetch'
import { Resolver } from '~/types/resolver'
import { Find, Search, SearchResult } from '~/types/tmdb'

type Args = {
  query: string
  page: number
}

export const searchResolver: Resolver<Search, Args> = async (_, args) => {
  if (!args.query) {
    const res = await tmdbFetch(`/trending/all/week`, {})

    const data: Search = await res.json()

    return data
  } else {
    if (args.query.startsWith('tt')) {
      const res = await tmdbFetch(`/find/${args.query}`, {
        external_source: 'imdb_id',
      })

      const data: Find = await res.json()

      const searchResults: SearchResult[] = [
        ...data.movie_results,
        ...data.tv_results,
      ]

      const search: Search = {
        page: 1,
        results: searchResults,
        total_pages: 1,
        total_results: searchResults.length,
      }

      return search
    } else {
      const res = await tmdbFetch(`/search/multi`, {
        query: args.query,
        page: (args.page ?? 1).toString(),
      })

      const data: Search = await res.json()

      return data
    }
  }
}
