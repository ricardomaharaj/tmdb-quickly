export let seasonDoc = /* GraphQL */ `
  query ($id: String!, $season_number: String!, $query: String, $page: Int) {
    tv(id: $id) {
      name
      backdrop_path
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
          key
          name
          published_at
        }
      }
    }
  }
`
