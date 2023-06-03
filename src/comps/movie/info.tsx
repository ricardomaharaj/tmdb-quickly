import { gql, useQuery } from 'urql'
import { ID } from '~/types/id'
import { Movie } from '~/types/tmdb'
import { Queries, releaseTypes } from './types'

const query = gql`
  query ($id: ID!) {
    movie(id: $id) {
      overview
      production_companies {
        name
      }
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
    }
  }
`

type Data = { movie?: Movie }
type Vars = { id: ID }
function useInfoQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

type Props = { queries: Queries }
export default function Info(props: Props) {
  const { queries } = props
  const { id } = queries
  const [res] = useInfoQuery({ id })
  const movie = res.data?.movie

  const release_dates = movie?.release_dates?.results
    ?.filter((x) => x.iso_3166_1 === 'US')
    ?.at(0)?.release_dates

  return (
    <>
      <div className='row mb-2'>
        <div>{movie?.overview}</div>
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
