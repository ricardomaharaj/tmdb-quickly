import { filterCast } from '~/server/util/filter-cast'
import { filterCrew } from '~/server/util/filter-crew'
import { filterImages } from '~/server/util/filter-images'
import { getPaginatePos } from '~/server/util/paginate-pos'
import { tmdbFetch } from '~/server/util/tmdb-fetch'
import { Resolver } from '~/types/resolver'
import { TVEpisode } from '~/types/tmdb'

type Args = {
  id: string
  season_number: string
  episode_number: string
  query: string
  page: number
}

export const tvEpisodeResolver: Resolver<TVEpisode, Args> = async (_, args) => {
  const res = await tmdbFetch(
    `/tv/${args.id}/season/${args.season_number}/episode/${args.episode_number}`,
    {
      append_to_response: 'images,videos',
    },
  )

  const tvEpisode: TVEpisode = await res.json()

  const { start, end } = getPaginatePos(args.page ?? 1)

  return {
    ...tvEpisode,
    guest_stars: filterCast({
      cast: tvEpisode.guest_stars,
      query: args.query,
      page: args.page,
    }),
    crew: filterCrew({
      crew: tvEpisode.crew,
      query: args.query,
      page: args.page,
    }),
    images: {
      stills: filterImages({
        images: tvEpisode.images?.stills,
        page: args.page,
      }),
    },
    videos: {
      results: tvEpisode.videos?.results?.slice(start, end),
    },
  }
}
