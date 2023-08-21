import { tmdbApi } from '~/server/util/tmdb-api'
import { GqlResolver } from '~/types/gql-resolver'
import { Search } from '~/types/tmdb'

export const search: GqlResolver<Search> = async (_, { query, page }) => {
  if (query) {
    return await tmdbApi.get<Search>('/search/multi', { query, page })
  } else {
    return await tmdbApi.get<Search>('/trending/all/week')
  }
}
