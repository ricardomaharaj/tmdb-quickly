import Link from 'next/link'
import { useState } from 'react'
import { Pager } from '~/components/reusable/pager'
import { PosterCard } from '~/components/reusable/poster-card'
import { QueryBar } from '~/components/reusable/query-bar'
import { useParams } from '~/hooks/params'
import { useTimeout } from '~/hooks/timeout'
import { dateStr } from '~/util/date-str'
import { useSearchQuery } from './query'

const tabMap = {
  movie: 'Movies',
  tv: 'TV Shows',
  person: 'People',
} as const

export function HomePage() {
  const [params, replace] = useParams({
    query: '',
    page: '1',
    tab: '',
  })

  const { query, page: pageStr, tab: curTab } = params
  const page = parseInt(pageStr)

  const [res] = useSearchQuery({ page, query })
  const results = res.data?.search?.results?.filter((x) => {
    if (!curTab) return true
    if (x.media_type === curTab) return true
    return false
  })

  const [debounce, setDebounce] = useState(query)
  useTimeout(() => {
    if (debounce !== query) {
      replace({ query: debounce, page: '1' })
    }
  }, [debounce])

  const setPage = (dir: number) => replace({ page: (page + dir).toString() })

  const showPager = !!query

  return (
    <div className='m-2'>
      <QueryBar
        query={query}
        onInputChange={(e) => setDebounce(e.target.value)}
        onClearClick={() => replace({ query: '', page: '1' })}
        thick={true}
      />

      <div className='row mb-2 space-x-2'>
        {Object.entries(tabMap).map(([value, title], i) => (
          <button
            className={`btn ${
              value === curTab ? 'bg-primary-700' : 'bg-primary-800'
            }`}
            onClick={() => replace({ tab: curTab === value ? '' : value })}
            key={i}
          >
            {title}
          </button>
        ))}
      </div>

      <div className='grid123'>
        {results?.map((x, i) => (
          <Link href={`/${x.media_type}/${x.id}`} key={i}>
            <PosterCard
              path={x.poster_path || x.profile_path}
              pri={x.name || x.title}
              sec={
                query ? dateStr(x.release_date || x.first_air_date) : undefined
              }
              ter={x.overview}
            />
          </Link>
        ))}
      </div>

      {showPager && (
        <Pager
          page={page}
          onPageDownClick={() => setPage(-1)}
          onPageUpClick={() => setPage(1)}
        />
      )}
    </div>
  )
}
