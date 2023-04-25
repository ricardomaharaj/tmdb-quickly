import { Fetcher } from '~/util/fetcher'

export const tmdbApi = new Fetcher({
  baseUrl: 'https://api.themoviedb.org/3/',
  opts: { params: { api_key: process.env.TMDB! } },
})
