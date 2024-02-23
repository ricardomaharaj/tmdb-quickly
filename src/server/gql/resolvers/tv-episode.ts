import { filterImages } from '~/server/util/filter-images'
import { getPaginatePos } from '~/server/util/paginate-pos'
import { tmdbFetch } from '~/server/util/tmdb-fetch'
import { TVEpisode } from '~/types/tmdb'

export async function tvEpisodeResolver(
  _: unknown,
  args: {
    id: string
    season_number: string
    episode_number: string
    query: string
    page: number
  },
) {
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
    images: {
      stills: filterImages({
        images: tvEpisode.images?.stills,
        page: args.page,
      }),
    },
    videos: {
      results: tvEpisode.videos?.results?.slice(start, end),
    },
  } as TVEpisode
}
