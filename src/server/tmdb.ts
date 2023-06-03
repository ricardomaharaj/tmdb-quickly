import { env } from '~/env'
import { Episode, Movie, Search, Season, TV } from '~/types/tmdb'
import { Fetcher } from '~/util/fetcher'
import { Resolver } from './types'

const api = new Fetcher({
  baseUrl: 'https://api.themoviedb.org/3',
  params: { api_key: env.TMDB },
})

const perPage = 8

function getPagePos(page: number) {
  const start = (page - 1) * perPage
  const end = page * perPage

  return { start, end }
}

const search: Resolver<Search> = async (_, { query, page }) => {
  if (query) {
    return await api.get<Search>('/search/multi', { query, page })
  } else {
    return await api.get<Search>('/trending/all/week')
  }
}

const movie: Resolver<Movie> = async (_, { id, query, page }) => {
  const movie = await api.get<Movie>(`/movie/${id}`, {
    append_to_response: 'credits,images,videos,release_dates,',
  })

  const { start, end } = getPagePos(page)

  if (query) {
    query = query.toLowerCase()

    if (movie?.credits?.cast) {
      movie.credits.cast = movie.credits.cast.filter((person) => {
        if (person.name?.toLowerCase().includes(query)) return true
        if (person.character?.toLowerCase().includes(query)) return true
        return false
      })
    }

    if (movie?.credits?.crew) {
      movie.credits.crew = movie.credits.crew.filter((person) => {
        if (person.name?.toLowerCase().includes(query.toLowerCase()))
          return true
        if (person.job?.toLowerCase().includes(query.toLowerCase())) return true
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

const tv: Resolver<TV> = async (_, { id, query, page }) => {
  const tv = await api.get<TV>(`/tv/${id}`, {
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

const season: Resolver<Season> = async (_, { id, season_number }) => {
  return await api.get<Season>(`/tv/${id}/season/${season_number}`, {
    append_to_response: 'credits,images,videos',
  })
}

const episode: Resolver<Episode> = async (
  _,
  { id, season_number, episode_number },
) => {
  return await api.get<Episode>(
    `/tv/${id}/season/${season_number}/episode/${episode_number}`,
    {
      append_to_response: 'credits,images,videos',
    },
  )
}

export const TMDB = {
  search,
  movie,
  tv,
  season,
  episode,
}
