import { env } from '~/server/env'

const { API_BASE_URL, TMDB_API_KEY } = env

export async function tmdbFetch(path: string, params: Record<string, string>) {
  const searchParams = new URLSearchParams({ ...params, api_key: TMDB_API_KEY })
  return fetch(`${API_BASE_URL}${path}?${searchParams}`, {
    cache: 'force-cache',
  })
}
