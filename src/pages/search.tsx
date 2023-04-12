import { Fragment, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PosterCard } from '../comps/poster-card'
import { posterCardSilhouette } from '../consts'
import { useSearchQuery } from '../gql'
import { overviewTrimmer, setTitle, toDateString } from '../util'

enum Tabs {
  Movies = 'movie',
  Shows = 'tv',
  People = 'person'
}

export function Search() {
  setTitle()

  const [params, setParams] = useSearchParams()

  const tab = params.get('tab') || Tabs.Movies
  const page = parseInt(params.get('page') || '1')

  const query = params.get('query') || ''
  const [debouncedVal, setDebounceVal] = useState(params.get('query') || '')
  const ref = useRef<NodeJS.Timeout>()

  useEffect(() => {
    ref.current = setTimeout(() => {
      replaceSearchParams({ query: debouncedVal })
    }, 500)
    return () => clearTimeout(ref.current)
  }, [debouncedVal])

  const replaceSearchParams = (update: any) =>
    setParams({ tab, query, page, ...update }, { replace: true })

  const [res] = useSearchQuery({ query, page: `${page}` })

  const { data, fetching, error } = res

  let results = data?.search?.results
  const maxPages = data?.search?.total_pages
  const firstPage = page === 1
  const lastPage = page === maxPages

  const TABS = [
    { name: 'MOVIES', val: Tabs.Movies },
    { name: 'SHOWS', val: Tabs.Shows },
    { name: 'PEOPLE', val: Tabs.People }
  ]

  results = results?.filter((result) => result.media_type === tab)

  if (error) return <div className='err'>{error.message}</div>

  return (
    <>
      <input
        type='text'
        className='input p-3 text-center text-xl'
        id='query'
        placeholder='SEARCH'
        defaultValue={query}
        onChange={(e) => setDebounceVal(e.target.value)}
      />

      <div className='row scroll-hide space-x-2'>
        {TABS.map((x, i) => (
          <button
            className={`btn ${tab === x.val && 'sel'}`}
            onClick={() => replaceSearchParams({ tab: x.val })}
            key={i}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div className='grid123'>
        {fetching ? (
          <>
            {Array(9)
              .fill(posterCardSilhouette)
              .map((x, i) => (
                <Fragment key={i}>{x}</Fragment>
              ))}
          </>
        ) : (
          <>
            {results?.map((x, i) => (
              <PosterCard
                image={x.poster_path || x.profile_path}
                primary={x.title || x.name}
                secondary={
                  x.media_type === 'person' ? '' : overviewTrimmer(x.overview)
                }
                tertiary={
                  x.media_type === 'person'
                    ? ''
                    : query
                    ? toDateString(x.release_date || x.first_air_date)
                    : ''
                }
                variant={tab as Tabs}
                href={`/${x.media_type}/${x.id}`}
                key={i}
              />
            ))}
          </>
        )}
      </div>

      {query && (
        <div className='row scroll-hide space-x-2'>
          <button
            className='btn'
            disabled={firstPage}
            onClick={() => replaceSearchParams({ page: page - 1 })}
          >
            BACK
          </button>
          <div className='p-2'>{page}</div>
          <button
            className='btn'
            disabled={lastPage}
            onClick={() => replaceSearchParams({ page: page + 1 })}
          >
            NEXT
          </button>
        </div>
      )}
    </>
  )
}
