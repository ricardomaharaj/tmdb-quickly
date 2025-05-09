import { env } from '~/server/env'

const api_key = env.TMDB_API_KEY

export async function tmdbFetch(path: string, params: Record<string, string>) {
  if (!api_key) throw Error('NO TMDB_API_KEY')

  const searchParams = new URLSearchParams({
    ...params,
    api_key: api_key,
  })

  return fetch(`https://api.themoviedb.org/3${path}?${searchParams}`, {
    cache: 'force-cache',
  })
}
