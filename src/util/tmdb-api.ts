import { env } from '~/env'
import { Args } from '~/types/args'
import { Episode, Movie, Search, Season, TV } from '~/types/tmdb'
import { Fetcher } from '~/util/fetcher'

const api = new Fetcher({
  baseUrl: 'https://api.themoviedb.org/3',
  params: { api_key: env.TMDB },
})

export const TMDB = {
  trending: async () => {
    return await api.get<Search>('/trending/all/week')
  },
  search: async (args: Pick<Args, 'query' | 'page'>) => {
    const { query, page } = args
    return await api.get<Search>('/search/multi', { query, page })
  },
  movie: async (args: Pick<Args, 'id'>) => {
    const { id } = args
    return await api.get<Movie>(`/movie/${id}`, {
      append_to_response: 'credits,images,videos,release_dates,',
    })
  },
  tv: async (args: Pick<Args, 'id'>) => {
    const { id } = args
    return await api.get<TV>(`/tv/${id}`, {
      append_to_response: 'aggregate_credits,images,videos',
    })
  },
  season: async (args: Pick<Args, 'id' | 'season_number'>) => {
    const { id, season_number } = args
    return await api.get<Season>(`/tv/${id}/season/${season_number}`, {
      append_to_response: 'credits,images,videos',
    })
  },
  episode: async (
    args: Pick<Args, 'id' | 'season_number' | 'episode_number'>,
  ) => {
    const { id, season_number, episode_number } = args

    return await api.get<Episode>(
      `/tv/${id}/season/${season_number}/episode/${episode_number}`,
      {
        append_to_response: 'credits,images,videos',
      },
    )
  },
}
