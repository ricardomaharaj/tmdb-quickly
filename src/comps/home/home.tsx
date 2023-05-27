import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { gql, useQuery } from 'urql'
import type { Search } from '~/types/tmdb'
import { imageUrls } from '~/util/image-urls'
import { Queries, zQueries } from './types'

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

  const [res] = useSearch({ query, page })
  const results = res.data?.search.results

  function replaceQueries(update: Partial<Queries>) {
    router.replace({
      query: { query, page, ...update },
    })
  }

  const [dbVal, setDbVal] = useState('')
  const ref = useRef<NodeJS.Timeout>()
  useEffect(() => {
    ref.current = setTimeout(() => {
      if (dbVal && dbVal !== query) {
        replaceQueries({ query: dbVal })
      }
    }, 500)
    return () => {
      clearTimeout(ref.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbVal])

  return (
    <div className='m-2'>
      <div className='row mb-2'>
        <input
          type='text'
          placeholder='Search'
          defaultValue={query}
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
              {query && <div>{x.first_air_date || x.release_date}</div>}
              <div className={`${query ? 'line-clamp-2' : 'line-clamp-3'}`}>
                {x.overview}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
