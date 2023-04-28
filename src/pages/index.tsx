import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { gql, useQuery } from 'urql'

import { Img } from '~/comps/image'
import { Queries, zQueries } from '~/types/search'
import { SearchResults } from '~/types/tmdb'
import { useTitle } from '~/util'

const searchQuery = gql`
  query Search($query: String, $page: Int) {
    search(query: $query, page: $page) {
      total_results
      total_pages
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

export default function Home() {
  useTitle()
  const router = useRouter()

  const { query, page } = zQueries.parse(router.query)

  function updateQueries(update: Partial<Queries>) {
    router.replace({ query: { query, page, ...update } })
  }

  const [{ data }] = useQuery<{ search: SearchResults }>({
    query: searchQuery,
    variables: { query, page },
  })
  const results = data?.search?.results

  const [debounce, setDebounce] = useState(query)
  const ref = useRef<NodeJS.Timeout>()
  useEffect(() => {
    ref.current = setTimeout(() => {
      updateQueries({ query: debounce })
    }, 500)
    return () => clearTimeout(ref.current)
  }, [debounce])

  return (
    <>
      <div className='row'>
        <input
          type='text'
          placeholder='SEARCH'
          className='w-full border-2 p-2 text-center text-xl outline-none'
          defaultValue={query}
          onChange={(e) => setDebounce(e.target.value)}
        />
      </div>
      <div className='grid123'>
        {results?.map((x, i) => (
          <Link href={`${x?.media_type}/${x?.id}`} className='row' key={i}>
            <div className='col mr-2'>
              <Img src={x?.poster_path || x?.profile_path} />
            </div>
            <div className='col'>
              {query && <div>{x?.release_date || x?.first_air_date}</div>}
              <div>{x?.title || x?.name}</div>
              {x?.overview && <div className='line-clamp-2'>{x.overview}</div>}
            </div>
          </Link>
        ))}
      </div>
      {query && (
        <div className='row space-x-4'>
          <button
            disabled={page <= 1}
            onClick={() => updateQueries({ page: page - 1 })}
          >
            BACK
          </button>
          <div>{page}</div>
          <button onClick={() => updateQueries({ page: page + 1 })}>
            NEXT
          </button>
        </div>
      )}
    </>
  )
}
