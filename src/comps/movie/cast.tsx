import Image from 'next/image'
import Link from 'next/link'
import { gql, useQuery } from 'urql'
import { Movie } from '~/types/tmdb'
import { useDebounce } from '~/util/debounce'
import { imageUrls } from '~/util/image-urls'
import type { Props, Queries } from './types'

const query = gql`
  query ($id: ID!, $query: String, $page: Int) {
    movie(id: $id, query: $query, page: $page) {
      credits {
        cast {
          character
          id
          name
          profile_path
        }
      }
    }
  }
`

type Data = { movie: { credits: Movie['credits'] } }
type Vars = Omit<Queries, 'tab'>
function useCastQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

export function Cast(props: Props) {
  const { queries, replaceQueries } = props
  const { id, query, page } = queries

  const { setDbVal, val } = useDebounce(query)

  const [res] = useCastQuery({ id, query: val, page })
  const cast = res.data?.movie?.credits?.cast

  return (
    <>
      <div className='row mb-2'>
        <input
          type='text'
          placeholder='Search'
          className='p-2 border-2 w-full'
          onChange={(e) => setDbVal(e.target.value)}
        />
      </div>
      <div className='col space-y-2 mb-2'>
        {cast?.map((x, i) => (
          <Link href={`/person/${x.id}`} className='row' key={i}>
            {x.profile_path && (
              <Image
                src={`${imageUrls.w94h141}${x.profile_path}`}
                width={94}
                height={141}
                className='mr-2'
                alt=''
              />
            )}
            <div className='col'>
              <div>{x.name}</div>
              <div>{x.character}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className='row justify-evenly py-2'>
        <button
          className='px-8 py-2'
          onClick={() => replaceQueries({ page: page - 1 })}
        >
          {'<'}
        </button>
        <div className='py-2'>{page}</div>
        <button
          className='px-8 py-2'
          onClick={() => replaceQueries({ page: page + 1 })}
        >
          {'>'}
        </button>
      </div>
    </>
  )
}
