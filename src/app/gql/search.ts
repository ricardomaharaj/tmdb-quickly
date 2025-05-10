export const searchDoc: string = /* GraphQL */ `
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
