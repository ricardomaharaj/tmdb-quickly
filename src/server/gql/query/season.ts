import { tmdbApi } from '~/server/util/tmdb-api'
import { GqlResolver } from '~/types/gql-resolver'
import { Season } from '~/types/tmdb'
import { getPagePos } from '~/util/paginate'

export const season: GqlResolver<Season> = async (
  _,
  { id, season_number, query, page },
) => {
  const season = await tmdbApi.get<Season>(
    `/tv/${id}/season/${season_number}`,
    {
      append_to_response: 'credits,images,videos',
    },
  )

  const { start, end } = getPagePos(page)

  if (query) {
    const q = query.toLowerCase()

    if (season.credits?.cast) {
      season.credits.cast = season.credits.cast.filter((x) => {
        if (x.name?.toLowerCase().includes(q)) return true
        if (x.character?.toLowerCase().includes(q)) return true
        return false
      })
    }

    if (season.credits?.crew) {
      season.credits.crew = season.credits.crew.filter((x) => {
        if (x.name?.toLowerCase().includes(q)) return true
        if (x.job?.toLowerCase().includes(q)) return true
        return false
      })
    }
  }

  return {
    ...season,
    credits: {
      cast: season.credits?.cast?.slice(start, end),
      crew: season.credits?.crew?.slice(start, end),
    },
    images: {
      posters: season.images?.posters?.slice(start, end),
    },
    videos: {
      results: season.videos?.results?.slice(start, end),
    },
  }
}
