import { tmdbApi } from '~/server/util/tmdb-api'
import { GqlResolver } from '~/types/gql-resolver'
import { TV } from '~/types/tmdb'
import { getPagePos } from '~/util/paginate'

export const tv: GqlResolver<TV> = async (_, { id, query, page }) => {
  const tv = await tmdbApi.get<TV>(`/tv/${id}`, {
    append_to_response: 'aggregate_credits,images,videos',
  })

  const { start, end } = getPagePos(page)

  if (query) {
    const q = query.toLowerCase()

    if (tv?.aggregate_credits?.cast) {
      tv.aggregate_credits.cast = tv.aggregate_credits.cast.filter((x) => {
        if (x.name?.toLowerCase().includes(q)) return true

        const characters = x.roles?.map((y) => y.character?.toLowerCase())
        if (characters) {
          for (let i = 0; i < characters.length; i++) {
            if (characters[i]?.includes(q)) return true
          }
        }

        return false
      })
    }

    if (tv?.aggregate_credits?.crew) {
      tv.aggregate_credits.crew = tv.aggregate_credits.crew.filter((x) => {
        if (x.name?.toLowerCase().includes(q)) return true

        const jobs = x.jobs?.map((y) => y.job?.toLowerCase())
        if (jobs) {
          for (let i = 0; i < jobs.length; i++) {
            if (jobs[i]?.includes(q)) return true
          }
        }

        return false
      })
    }
  }

  return {
    ...tv,
    aggregate_credits: {
      cast: tv.aggregate_credits?.cast?.slice(start, end),
      crew: tv.aggregate_credits?.crew?.slice(start, end),
    },
    images: {
      posters: tv.images?.posters
        ?.filter((x) => x.iso_639_1 === 'en' || !x.iso_639_1)
        ?.slice(start, end),
      backdrops: tv.images?.backdrops
        ?.filter((x) => x.iso_639_1 === 'en' || !x.iso_639_1)
        ?.slice(start, end),
    },
    videos: { results: tv.videos?.results?.slice(start, end) },
  }
}
