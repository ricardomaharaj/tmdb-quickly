import { gql } from 'urql'
import { Search } from '~/types/tmdb'

type Data = {
  search: Search
}

type Vars = {
  query?: string
  page?: number
}

export const searchDoc = gql<Data, Vars>`
  query ($query: String, $page: Int) {
    search(query: $query, page: $page) {
      results {
        id
        media_type
        poster_path
        profile_path
        name
        title
        first_air_date
        release_date
      }
    }
  }
`
