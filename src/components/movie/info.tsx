import { gql } from 'urql'
import { MovieProps } from '~/types/props'
import { dateStr } from '~/util/date-str'
import { releaseTypes } from '~/util/release-types'
import { useMovieQuery } from './query'

const gqlQuery = gql`
  query ($id: String!) {
    movie(id: $id) {
      budget
      genres {
        name
      }
      imdb_id
      original_language
      original_title
      overview
      release_dates {
        results {
          iso_3166_1
          release_dates {
            iso_639_1
            release_date
            type
          }
        }
      }
      production_companies {
        name
      }
      revenue
      runtime
      status
    }
  }
`

export default function Info({ id }: MovieProps) {
  const [res] = useMovieQuery(gqlQuery, { id })
  const movie = res.data?.movie

  const release_dates = movie?.release_dates?.results
    ?.filter((x) => x.iso_3166_1 === 'US')
    ?.at(0)?.release_dates

  const budget = !!movie?.budget && movie.budget > 0
  const revenue = !!movie?.revenue && movie.revenue > 0

  const earnings = budget && revenue

  return (
    <>
      <div className='row bubble'>
        <div>{movie?.overview}</div>
      </div>

      <div className='col bubble'>
        {movie?.status && <div>Status: {movie?.status}</div>}
        {budget && <div>Budget: ${movie?.budget?.toLocaleString()}</div>}
        {revenue && <div>Revenue: ${movie?.revenue?.toLocaleString()}</div>}
        {earnings && (
          <div>
            Earnings: ${(movie.revenue! - movie.budget!).toLocaleString()}
          </div>
        )}
        {movie?.runtime && <div>Runtime: {movie?.runtime}m</div>}
        {movie?.original_language && (
          <div>Original Language: {movie?.original_language}</div>
        )}
        {movie?.original_title && (
          <div>Original Title: {movie?.original_title}</div>
        )}
        {movie?.imdb_id && <div>IMDB ID: {movie?.imdb_id}</div>}
        <div>TMDB ID: {id}</div>
      </div>

      <div className='row overscroll mb-2 space-x-2'>
        {movie?.genres?.map((x, i) => (
          <div className='tag' key={i}>
            {x.name}
          </div>
        ))}
      </div>

      <div className='row overscroll mb-2 space-x-2'>
        {movie?.production_companies?.map((x, i) => (
          <div className='tag' key={i}>
            {x.name}
          </div>
        ))}
      </div>

      <div className='row overscroll space-x-2'>
        {release_dates?.map((x, i) => (
          <div key={i} className='col tag'>
            {x.type && <div>{releaseTypes[x.type]}</div>}
            {x.release_date && <div>{dateStr(x.release_date)}</div>}
          </div>
        ))}
      </div>
    </>
  )
}
