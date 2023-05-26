import { env } from '~/env'
import { ID } from '~/types/id'
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
  search: async ({ query, page }: { query: string; page: number }) => {
    return await api.get<Search>('/search/multi', { query, page })
  },
  movie: async ({ id }: { id: ID }) => {
    return await api.get<Movie>(`/movie/${id}`, {
      append_to_response: 'credits,images,videos,release_dates,',
    })
  },
  tv: async ({ id }: { id: ID }) => {
    return await api.get<TV>(`/tv/${id}`, {
      append_to_response: 'aggregate_credits,images,videos',
    })
  },
  season: async ({ id, season_number }: { id: ID; season_number: number }) => {
    return await api.get<Season>(`/tv/${id}/season/${season_number}`, {
      append_to_response: 'credits,images,videos',
    })
  },
  episode: async ({
    id,
    season_number,
    episode_number,
  }: {
    id: ID
    season_number: number
    episode_number: number
  }) => {
    return await api.get<Episode>(
      `/tv/${id}/season/${season_number}/episode/${episode_number}`,
      {
        append_to_response: 'credits,images,videos',
      },
    )
  },
}
