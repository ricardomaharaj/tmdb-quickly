export let movieDoc = /* GraphQL */ `
  query ($id: String!, $query: String, $page: Int) {
    movie(id: $id, query: $query, page: $page) {
      id
      poster_path
      backdrop_path
      title
      tagline
      release_date
      overview
      status
      runtime
      budget
      revenue
      imdb_id

      genres {
        name
      }

      release_dates {
        results {
          release_dates {
            type
            release_date
          }
        }
      }

      production_companies {
        name
      }

      credits {
        cast {
          id
          name
          character
          profile_path
        }
        crew {
          id
          name
          job
          profile_path
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
