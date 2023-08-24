import { gql, useQuery } from 'urql'
import { Search } from '~/types/tmdb'

const query = gql`
  query ($query: String, $page: Int) {
    search(query: $query, page: $page) {
      results {
        first_air_date
        id
        media_type
        name
        overview
        poster_path
        profile_path
        release_date
        title
      }
      total_pages
      total_results
      page
    }
  }
`

type Data = {
  search?: Search
}

type Vars = {
  query?: string
  page?: number
}

export function useSearchQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}
