import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

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

  const queries = router.query as Record<string, string | undefined>

  const query = queries.query || ''
  const page = parseInt(queries.page || '1')

  function updateQueries(update: any) {
    router.replace({ pathname: '/', query: { query, page, ...update } })
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
          defaultValue={query}
          className='w-full border-2 p-2 text-center outline-none'
          onChange={(e) => setDebounce(e.target.value)}
        />
      </div>
      <div className='grid123 mt-2'>
        {results?.map((x) => (
          <Link
            href={`${x?.media_type}/${x?.id}`}
            key={`${x?.media_type}/${x?.id}`}
            className='row'
          >
            <div className='col'>
              <img
                src={`${imageUrls.w94h141}${x?.poster_path || x?.profile_path}`}
                className='mr-2 max-w-[94px]'
                alt=''
              />
            </div>
            <div className='col'>
              {query && <div>{x?.release_date || x?.first_air_date}</div>}
              <div>{x?.title || x?.name}</div>
              {x?.overview && <div>{trimmer(x?.overview)}</div>}
            </div>
          </Link>
        ))}
      </div>
      {query && (
        <div className='row justify-evenly py-2'>
          <button
            className='px-4'
            onClick={() => updateQueries({ page: page - 1 })}
          >
            {'<'}
          </button>
          <div>{page}</div>
          <button
            className='px-4'
            onClick={() => updateQueries({ page: page + 1 })}
          >
            {'>'}
          </button>
        </div>
      )}
    </>
  )
}
