import { env } from '~/server/env'

export async function tmdbFetch(path: string, params: Record<string, string>) {
  const searchParams = new URLSearchParams({
    ...params,
    api_key: env.TMDB_API_KEY,
  })

  return fetch(`${env.API_BASE_URL}${path}?${searchParams}`, {
    cache: 'force-cache',
  })
}
