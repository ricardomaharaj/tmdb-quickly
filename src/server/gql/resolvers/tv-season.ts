import { filterCast } from '~/server/util/filter-cast'
import { filterCrew } from '~/server/util/filter-crew'
import { filterImages } from '~/server/util/filter-images'
import { getPaginatePos } from '~/server/util/paginate-pos'
import { tmdbFetch } from '~/server/util/tmdb-fetch'
import { Resolver } from '~/types/resolver'
import { TVSeason } from '~/types/tmdb'

type Args = {
  id: string
  season_number: string
  query: string
  page: number
}

export const tvSeasonResolver: Resolver<TVSeason, Args> = async (_, args) => {
  const res = await tmdbFetch(`/tv/${args.id}/season/${args.season_number}`, {
    append_to_response: 'credits,images,videos',
  })

  const tvSeason: TVSeason = await res.json()

  const { start, end } = getPaginatePos(args.page ?? 1)

  return {
    ...tvSeason,
    credits: {
      cast: filterCast({
        cast: tvSeason.credits?.cast,
        query: args.query,
        page: args.page,
      }),
      crew: filterCrew({
        crew: tvSeason.credits?.crew,
        query: args.query,
        page: args.page,
      }),
    },
    images: {
      posters: filterImages({
        images: tvSeason.images?.posters,
      }),
    },
    videos: {
      results: tvSeason.videos?.results?.slice(start, end),
    },
  }
}
