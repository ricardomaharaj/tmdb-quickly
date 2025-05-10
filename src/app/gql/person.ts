export const personDoc: string = /* GraphQL */ `
  query ($id: String!, $query: String, $page: Int = 10, $filter: String) {
    person(id: $id, query: $query, page: $page, filter: $filter) {
      name
      biography
      profile_path

      images {
        profiles {
          file_path
        }
      }

      combined_credits {
        cast {
          character
          episode_count
          first_air_date
          id
          media_type
          name
          poster_path
          release_date
          title
        }

        crew {
          episode_count
          first_air_date
          id
          job
          media_type
          name
          poster_path
          release_date
          title
        }
      }
    }
  }
`
