import { tmdbFetch } from '~/server/util/tmdb-fetch'

export async function searchResolver(
  _: unknown,
  args: { query: string; page: number },
) {
  if (!args.query) {
    const res = await tmdbFetch(`/trending/all/week`, {})
    return await res.json()
  } else {
    const res = await tmdbFetch(`/search/multi`, {
      query: args.query,
      page: (args.page ?? 1).toString(),
    })
    return await res.json()
  }
}
