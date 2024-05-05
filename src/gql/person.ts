import { gql } from 'urql'
import { Person } from '~/types/tmdb'

type Data = {
  person: Person
}

type Vars = {
  id: string
  query?: string
  page?: number
  filter?: string
}

export const personDoc = gql<Data, Vars>`
  query ($id: String!, $query: String, $page: Int = 10, $filter: String) {
    person(id: $id, query: $query, page: $page, filter: $filter) {
      name
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
