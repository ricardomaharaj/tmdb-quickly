import { env } from '~/server/env'
import { Resolver } from '~/types/resolver'
import { Episode, Movie, Search, Season, TV } from '~/types/tmdb'
import { Fetcher } from '~/util/fetcher'

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

const season: Resolver<Season> = async (
  _,
  { id, season_number, query, page },
) => {
  const season = await api.get<Season>(`/tv/${id}/season/${season_number}`, {
    append_to_response: 'credits,images,videos',
  })

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

const episode: Resolver<Episode> = async (
  _,
  { id, season_number, episode_number, query, page },
) => {
  const episode = await api.get<Episode>(
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
  }

  return {
    ...episode,
    credits: {
      cast: episode.credits?.cast?.slice(start, end),
      crew: episode.credits?.crew?.slice(start, end),
    },
    images: {
      stills: episode.images?.stills?.slice(start, end),
    },
    videos: {
      results: episode.videos?.results?.slice(start, end),
    },
  }
}

export const tmdbResolvers = {
  search,
  movie,
  tv,
  season,
  episode,
}
