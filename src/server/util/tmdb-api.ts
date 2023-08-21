import { env } from '~/server/env'
import { Fetcher } from '~/util/fetcher'

export const tmdbApi = new Fetcher({
  baseUrl: 'https://api.themoviedb.org/3',
  params: { api_key: env.TMDB },
})
