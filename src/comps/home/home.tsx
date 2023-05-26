import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql, useQuery } from 'urql'
import type { Search } from '~/types/tmdb'
import { useDebounce } from '~/util/debounce'
import { imageUrls } from '~/util/image-urls'
import { zQueries } from './types'

const query = gql`
  query ($query: String, $page: Int) {
    search(query: $query, page: $page) {
      page
      total_pages
      total_results
      results {
        first_air_date
        id
        media_type
        name
        overview
        poster_path
        profile_path
        release_date
        title
      }
    }
  }
`

type Data = { search: Search }
type Vars = { query: string; page: number }
function useSearch(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

export function Home() {
  const router = useRouter()
  const { query, page } = zQueries.parse(router.query)
  const { setDbVal, val } = useDebounce(query)

  const [res] = useSearch({ query: val, page })
  const results = res.data?.search.results

  return (
    <div className='m-2'>
      <div className='row mb-2'>
        <input
          type='text'
          placeholder='Search'
          className='border-2 w-full p-2'
          onChange={(e) => setDbVal(e.target.value)}
        />
      </div>
      <div className='col space-y-2'>
        {results?.map((x, i) => (
          <Link href={`/${x.media_type}/${x.id}`} className='row' key={i}>
            {(x.poster_path || x.profile_path) && (
              <Image
                src={`${imageUrls.w94h141}${x.poster_path || x.profile_path}`}
                width={94}
                height={141}
                className='mr-2'
                alt=''
              />
            )}
            <div className='col'>
              <div>{x.name || x.title}</div>
              <div>{x.first_air_date || x.release_date}</div>
              <div className='line-clamp-2'>{x.overview}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
