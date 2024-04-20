import { filterCast } from '~/server/util/filter-cast'
import { filterCrew } from '~/server/util/filter-crew'
import { filterImages } from '~/server/util/filter-images'
import { filterReleaseDates } from '~/server/util/filter-release-dates'
import { getPaginatePos } from '~/server/util/paginate-pos'
import { tmdbFetch } from '~/server/util/tmdb-fetch'
import { Movie } from '~/types/tmdb'

export async function movieResolver(
  _: unknown,
  args: { id: string; query?: string; page?: number },
) {
  const res = await tmdbFetch(`/movie/${args.id}`, {
    append_to_response: 'credits,images,release_dates,videos',
  })
  const movie: Movie = await res.json()

  const { start, end } = getPaginatePos(args.page ?? 1)

  return {
    ...movie,
    credits: {
      cast: filterCast({
        cast: movie.credits?.cast,
        query: args.query,
        page: args.page,
      }),
      crew: filterCrew({
        crew: movie.credits?.crew,
        query: args.query,
        page: args.page,
      }),
    },
    images: {
      posters: filterImages({
        images: movie.images?.posters,
        page: args.page,
      }),
      backdrops: filterImages({
        images: movie.images?.backdrops,
        page: args.page,
      }),
    },
    videos: {
      results: movie.videos?.results?.slice(start, end),
    },
    release_dates: {
      results: filterReleaseDates({
        releaseDates: movie.release_dates,
      }),
    },
  }
}
