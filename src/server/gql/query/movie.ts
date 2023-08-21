import { tmdbApi } from '~/server/util/tmdb-api'
import { GqlResolver } from '~/types/gql-resolver'
import { Movie } from '~/types/tmdb'
import { getPagePos } from '~/util/paginate'

export const movie: GqlResolver<Movie> = async (_, { id, query, page }) => {
  const movie = await tmdbApi.get<Movie>(`/movie/${id}`, {
    append_to_response: 'credits,images,videos,release_dates,',
  })

  const { start, end } = getPagePos(page)

  if (query) {
    const q = query.toLowerCase()

    if (movie?.credits?.cast) {
      movie.credits.cast = movie.credits.cast.filter((x) => {
        if (x.name?.toLowerCase().includes(q)) return true
        if (x.character?.toLowerCase().includes(q)) return true
        return false
      })
    }

    if (movie?.credits?.crew) {
      movie.credits.crew = movie.credits.crew.filter((x) => {
        if (x.name?.toLowerCase().includes(q)) return true
        if (x.job?.toLowerCase().includes(q)) return true
        return false
      })
    }
  }

  return {
    ...movie,
    credits: {
      cast: movie.credits?.cast?.slice(start, end),
      crew: movie.credits?.crew?.slice(start, end),
    },
    images: {
      backdrops: movie.images?.backdrops
        ?.filter((x) => x.iso_639_1 === 'en' || !x.iso_639_1)
        ?.slice(start, end),
      posters: movie.images?.posters
        ?.filter((x) => x.iso_639_1 === 'en' || !x.iso_639_1)
        ?.slice(start, end),
    },
    videos: { results: movie.videos?.results?.slice(start, end) },
  }
}
