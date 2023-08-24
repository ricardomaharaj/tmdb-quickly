import { person } from '~/server/gql/query/person'
import { episode } from './query/episode'
import { movie } from './query/movie'
import { search } from './query/search'
import { season } from './query/season'
import { tv } from './query/tv'

export const tmdbResolvers = {
  search,
  movie,
  tv,
  season,
  episode,
  person,
}
