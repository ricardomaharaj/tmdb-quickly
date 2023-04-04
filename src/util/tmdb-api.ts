import { CrewMember, MovieCredits } from '@/types/movie-credits'
import { Fetcher } from '@/util/fetcher'

const tmdbFetcher = new Fetcher({
  url: 'https://api.themoviedb.org/3/',
  opts: { params: { api_key: process.env.TMDB! } },
})

type StrNum = string | number

async function search({ query, page }: { query: string; page: StrNum }) {
  if (!query) {
    return await tmdbFetcher.get('trending/all/week')
  } else {
    return await tmdbFetcher.get('search/multi', {
      params: { query, page },
    })
  }
}

async function movie({ id }: { id: StrNum }) {
  return await tmdbFetcher.get(`movie/${id}`)
}

async function movieCredits({ id }: { id: StrNum }) {
  let credits: MovieCredits = await tmdbFetcher.get(`movie/${id}/credits`)

  let oldCrew = credits.crew
  let newCrew: CrewMember[] = []

  oldCrew?.forEach((oldCrewMember) => {
    const i = newCrew.findIndex(
      (newCrewMember) => newCrewMember.id === oldCrewMember.id
    )
    if (i === -1) newCrew.push(oldCrewMember)
    else newCrew[i].job += ` | ${oldCrewMember.job}`
  })

  credits.crew = newCrew
  return credits
}

async function tv({ id }: { id: StrNum }) {
  return await tmdbFetcher.get(`tv/${id}`)
}

async function tvCredits({ id }: { id: StrNum }) {
  return await tmdbFetcher.get(`tv/${id}/aggregate_credits`)
}

async function season({ id, season }: { id: StrNum; season: StrNum }) {
  return await tmdbFetcher.get(`tv/${id}/season/${season}`)
}

async function seasonCredits({ id, season }: { id: StrNum; season: StrNum }) {
  return await tmdbFetcher.get(`tv/${id}/season/${season}/aggregate_credits`)
}

async function episode({
  id,
  season,
  episode,
}: {
  id: StrNum
  season: StrNum
  episode: StrNum
}) {
  return await tmdbFetcher.get(`tv/${id}/season/${season}/episode/${episode}`)
}

async function episodeCredits({
  id,
  season,
  episode,
}: {
  id: StrNum
  season: StrNum
  episode: StrNum
}) {
  return await tmdbFetcher.get(
    `tv/${id}/season/${season}/episode/${episode}/credits`
  )
}

export const tmdbApi = {
  search,
  movie,
  movieCredits,
  tv,
  tvCredits,
  season,
  seasonCredits,
  episode,
  episodeCredits,
}
