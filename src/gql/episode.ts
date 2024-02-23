import { gql } from 'urql'
import { TV, TVEpisode } from '~/types/tmdb'

type Data = {
  tv: TV
  tvEpisode: TVEpisode
}

type Vars = {
  id: string
  season_number: string
  episode_number: string
  query?: string
  page?: number
}

export const episodeDoc = gql<Data, Vars>`
  query (
    $id: String!
    $season_number: String!
    $episode_number: String!
    $query: String
    $page: Int
  ) {
    tv(id: $id) {
      name
    }

    tvEpisode(
      id: $id
      season_number: $season_number
      episode_number: $episode_number
      query: $query
      page: $page
    ) {
      name
      overview
      runtime
      season_number
      episode_number
      still_path
      air_date

      crew {
        id
        name
        job
        profile_path
      }

      guest_stars {
        id
        name
        character
        profile_path
      }

      images {
        stills {
          file_path
        }
      }

      videos {
        results {
          key
          name
          published_at
        }
      }
    }
  }
`
