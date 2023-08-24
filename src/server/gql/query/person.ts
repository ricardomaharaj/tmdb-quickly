import { tmdbApi } from '~/server/util/tmdb-api'
import { GqlResolver } from '~/types/gql-resolver'
import { Person } from '~/types/tmdb'
import { getPagePos } from '~/util/paginate'

export const person: GqlResolver<Person> = async (
  _,
  { id, query, filter, page },
) => {
  const person = await tmdbApi.get<Person>(`/person/${id}`, {
    append_to_response: 'combined_credits,images',
  })

  const { start, end } = getPagePos(page)

  if (filter) {
    if (person.combined_credits?.cast) {
      person.combined_credits.cast = person.combined_credits?.cast.filter(
        (x) => x.media_type === filter,
      )
    }
    if (person.combined_credits?.crew) {
      person.combined_credits.crew = person.combined_credits?.crew.filter(
        (x) => x.media_type === filter,
      )
    }
  }

  if (query) {
    const q = query.toLowerCase()
    if (person.combined_credits?.cast) {
      person.combined_credits.cast = person.combined_credits?.cast.filter(
        (x) => {
          if (x.name?.toLowerCase().includes(q)) return true
          if (x.title?.toLowerCase().includes(q)) return true
          if (x.character?.toLowerCase().includes(q)) return true
          return false
        },
      )
    }
    if (person.combined_credits?.crew) {
      person.combined_credits.crew = person.combined_credits?.crew.filter(
        (x) => {
          if (x.name?.toLowerCase().includes(q)) return true
          if (x.title?.toLowerCase().includes(q)) return true
          if (x.job?.toLowerCase().includes(q)) return true
          return false
        },
      )
    }
  }

  return {
    ...person,
    combined_credits: {
      cast: person.combined_credits?.cast
        ?.sort((a, b) => {
          const yearA = (a.release_date || a.first_air_date)?.substring(0, 4)
          const yearB = (b.release_date || b.first_air_date)?.substring(0, 4)
          if (yearA && yearB) return parseInt(yearA) > parseInt(yearB) ? -1 : 1
          return -1
        })
        .slice(start, end),
      crew: person.combined_credits?.crew?.slice(start, end),
    },
    images: {
      profiles: person.images?.profiles?.slice(start, end),
    },
  }
}
