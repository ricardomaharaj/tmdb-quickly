export const showDoc: string = /* GraphQL */ `
  query ($id: String!, $query: String, $page: Int) {
    tv(id: $id, query: $query, page: $page) {
      id
      name
      poster_path
      backdrop_path
      overview
      status
      tagline
      type
      first_air_date
      last_air_date
      episode_run_time
      number_of_episodes
      number_of_seasons

      external_ids {
        imdb_id
      }

      genres {
        name
      }

      production_companies {
        name
      }

      networks {
        name
      }

      aggregate_credits {
        cast {
          id
          name
          profile_path
          roles {
            character
            episode_count
          }
        }

        crew {
          id
          name
          profile_path
          jobs {
            job
            episode_count
          }
        }
      }

      images {
        posters {
          file_path
        }

        backdrops {
          file_path
        }
      }

      seasons {
        id
        name
        poster_path
        air_date
        episode_count
        season_number
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
