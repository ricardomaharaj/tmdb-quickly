import { tmdbApi } from '~/server/util/tmdb-api'
import { GqlResolver } from '~/types/gql-resolver'
import { Episode } from '~/types/tmdb'
import { getPagePos } from '~/util/paginate'

export const episode: GqlResolver<Episode> = async (
  _,
  { id, season_number, episode_number, query, page },
) => {
  const episode = await tmdbApi.get<Episode>(
    `/tv/${id}/season/${season_number}/episode/${episode_number}`,
    {
      append_to_response: 'credits,images,videos',
    },
  )

  const { start, end } = getPagePos(page)

  if (query) {
    const q = query.toLowerCase()

    if (episode.credits?.cast) {
      episode.credits.cast = episode.credits.cast.filter((x) => {
        if (x.name?.toLowerCase().includes(q)) return true
        if (x.character?.toLowerCase().includes(q)) return true
        return false
      })
    }

    if (episode.credits?.crew) {
      episode.credits.crew = episode.credits.crew.filter((x) => {
        if (x.name?.toLowerCase().includes(q)) return true
        if (x.job?.toLowerCase().includes(q)) return true
        return false
      })
    }

    if (episode.credits?.guest_stars) {
      episode.credits.guest_stars = episode.credits.guest_stars.filter((x) => {
        if (x.name?.toLowerCase().includes(q)) return true
        if (x.character?.toLowerCase().includes(q)) return true
        return false
      })
    }
  }

  return {
    ...episode,
    credits: {
      cast: episode.credits?.cast?.slice(start, end),
      crew: episode.credits?.crew?.slice(start, end),
      guest_stars: episode.credits?.guest_stars?.slice(start, end),
    },
    images: {
      stills: episode.images?.stills?.slice(start, end),
    },
    videos: {
      results: episode.videos?.results?.slice(start, end),
    },
  }
}
