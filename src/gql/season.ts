import { gql } from 'urql'
import { TV, TVSeason } from '~/types/tmdb'

type Data = {
  tv: TV
  tvSeason: TVSeason
}

type Vars = {
  id: string
  season_number: string
  query?: string
  page?: number
}

export const seasonDoc = gql<Data, Vars>`
  query ($id: String!, $season_number: String!, $query: String, $page: Int) {
    tv(id: $id) {
      name
    }
    tvSeason(
      id: $id
      season_number: $season_number
      query: $query
      page: $page
    ) {
      poster_path
      name
      air_date
      overview

      episodes {
        air_date
        episode_number
        name
        overview
        runtime
        still_path
      }

      credits {
        cast {
          id
          profile_path
          name
          character
        }
        crew {
          id
          profile_path
          name
          job
        }
      }

      images {
        posters {
          file_path
        }
      }

      videos {
        results {
          name
          published_at
        }
      }
    }
  }
`
