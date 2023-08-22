import { useRouter } from 'next/router'
import { useState } from 'react'
import { LinkCard } from '~/components/reusable/link-card'
import { Pager } from '~/components/reusable/pager'
import { QueryBar } from '~/components/reusable/query-bar'
import { useTimeout } from '~/hooks/timeout'
import { paramParse } from '~/util/param-parse'
import { getSearchParams } from '~/util/search-params'
import { useSearchQuery } from './query'

const tabMap: Record<string, string> = {
  Movies: 'movie',
  'TV Shows': 'tv',
  People: 'person',
}

export function HomePage() {
  const router = useRouter()

  const searchParams = getSearchParams(router.query)
  const params = paramParse(searchParams)

  const query = params.query || ''
  const page = parseInt(params.page || '1')
  const curTab = params.tab || ''

  const [res] = useSearchQuery({ page, query })
  const results = res.data?.search?.results?.filter((x) => {
    if (!curTab) return true
    if (x.media_type === curTab) return true
    return false
  })

  function replaceParams(upd: Record<string, string | number | undefined>) {
    router.replace({ query: { ...params, ...upd } })
  }

  const [dbQuery, setDbQuery] = useState(query)
  useTimeout(() => {
    if (dbQuery !== query) {
      replaceParams({ query: dbQuery })
    }
  }, [dbQuery])

  const showPager = !!query

  return (
    <div className='m-2'>
      <QueryBar
        query={query}
        onInputChange={(e) => setDbQuery(e.target.value)}
        onClearClick={() => replaceParams({ query: '', page: 1 })}
        className='lg:p-4 lg:pl-4 lg:text-xl'
        iconClass='lg:text-2xl lg:mr-4'
      />

      <div className='row mb-2 space-x-2'>
        {Object.entries(tabMap).map(([key, val], i) => (
          <button
            className={`btn ${
              val === curTab ? 'bg-primary-700' : 'bg-primary-800'
            }`}
            onClick={() => replaceParams({ tab: curTab === val ? '' : val })}
            key={i}
          >
            {key}
          </button>
        ))}
      </div>

      <div className='grid123'>
        {results?.map((x, i) => (
          <LinkCard
            href={`/${x.media_type}/${x.id}`}
            path={x.poster_path || x.profile_path}
            pri={x.name || x.title}
            sec={query ? x.release_date || x.first_air_date : undefined}
            ter={x.overview}
            key={i}
          />
        ))}
      </div>

      {showPager && (
        <Pager
          page={page}
          onPageDownClick={() => replaceParams({ page: page - 1 })}
          onPageUpClick={() => replaceParams({ page: page + 1 })}
        />
      )}
    </div>
  )
}
