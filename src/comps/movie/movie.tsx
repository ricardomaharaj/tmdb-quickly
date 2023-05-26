import Image from 'next/image'
import { useRouter } from 'next/router'
import { gql, useQuery } from 'urql'
import { ID } from '~/types/id'
import { Movie } from '~/types/tmdb'
import { imageUrls } from '~/util/image-urls'
import { Cast } from './cast'
import { Crew } from './crew'
import { Info } from './info'
import type { Props, Queries } from './types'
import { tabs, zQueries } from './types'

const query = gql`
  query ($id: ID!) {
    movie(id: $id) {
      backdrop_path
      budget
      imdb_id
      original_language
      original_title
      overview
      poster_path
      production_companies {
        name
      }
      release_dates {
        results {
          release_dates {
            iso_639_1
            release_date
            type
          }
          iso_3166_1
        }
      }
      revenue
      release_date
      runtime
      status
      tagline
      title
    }
  }
`

type Data = { movie: Movie }
type Vars = { id: ID }
function useMovieQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

export function Movie() {
  const router = useRouter()
  const queries = zQueries.parse(router.query)
  const { id, tab, query, page } = queries

  const [res] = useMovieQuery({ id })
  const movie = res.data?.movie

  function replaceQueries(update: Partial<Queries>) {
    router.replace({ query: { id, tab, query, page, ...update } })
  }

  const props: Props = {
    queries,
    replaceQueries,
  }

  return (
    <>
      <div className='col m-2'>
        <div className='row mb-2'>
          {movie?.poster_path && (
            <Image
              src={`${imageUrls.w94h141}${movie.poster_path}`}
              width={94}
              height={141}
              className='mr-2'
              priority
              alt=''
            />
          )}
          <div className='col'>
            <div>{movie?.title}</div>
            <div>{movie?.release_date}</div>
            <div>{movie?.tagline}</div>
          </div>
        </div>
        <div className='row space-x-2 mb-1'>
          {tabs.map((x, i) => (
            <button onClick={() => replaceQueries({ tab: x })} key={i}>
              {x}
            </button>
          ))}
        </div>
        {tab === 'Info' && <Info movie={movie} />}
        {tab === 'Cast' && <Cast {...props} />}
        {tab === 'Crew' && <Crew {...props} />}
      </div>
    </>
  )
}
