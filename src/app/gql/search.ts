import { gql } from "urql"

export const searchDoc = gql`
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
