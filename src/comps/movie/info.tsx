import { gql } from 'urql'
import { releaseTypes } from '~/util/release-types'
import { useMovieQuery } from './query'
import type { Props } from './z'

export default function Info(props: Props) {
  const { queries } = props
  const { id } = queries

  const [res] = useMovieQuery({
    query: gql`
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
    `,
    variables: { id },
  })
  const movie = res.data?.movie

  const release_dates = movie?.release_dates?.results
    ?.filter((x) => x.iso_3166_1 === 'US')
    ?.at(0)?.release_dates

  return (
    <>
      <div className='row mb-2 border-2'>
        <div className='p-2'>{movie?.overview}</div>
      </div>

      <div className='col mb-2 border-2 p-2'>
        {movie?.status && <div>Status: {movie?.status}</div>}
        {movie?.budget && <div>Budget: ${movie?.budget?.toLocaleString()}</div>}
        {movie?.revenue && (
          <div>Revenue: ${movie?.revenue?.toLocaleString()}</div>
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

      <div className='row mb-2 space-x-2 overflow-scroll'>
        {movie?.genres?.map((x, i) => (
          <div className='whitespace-nowrap border-2 px-2 text-sm' key={i}>
            {x.name}
          </div>
        ))}
      </div>

      <div className='row mb-2 space-x-2 overflow-scroll'>
        {movie?.production_companies?.map((x, i) => (
          <div className='whitespace-nowrap border-2 px-2 text-sm' key={i}>
            {x.name}
          </div>
        ))}
      </div>

      <div className='row space-x-2 overflow-scroll'>
        {release_dates?.map((x, i) => (
          <div
            key={i}
            className='col whitespace-nowrap border-2 p-1 px-2 text-sm'
          >
            {x.type && <div>{releaseTypes[x.type]}</div>}
            {x.release_date && (
              <div key={i}>
                {new Date(x.release_date).toDateString().substring(4)}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
