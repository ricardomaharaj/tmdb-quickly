import { useRouter } from 'next/router'
import { useState } from 'react'
import { Card } from '~/comps/card'
import { Pager } from '~/comps/pager'
import { QueryBar } from '~/comps/query-bar'
import { useTimeout } from '~/hooks/timeout'
import { paramParse } from '~/util/param-parse'
import { getSearchParams } from '~/util/search-params'
import { useSearchQuery } from './query'

const tabs = {
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
  const tab = params.tab || ''

  const [res] = useSearchQuery({ page, query })
  const results = res.data?.search?.results?.filter((x) => {
    if (!tab) return true
    if (x.media_type === tab) return true
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
      />

      <div className='row mb-2 space-x-2'>
        {Object.entries(tabs).map(([key, val], i) => (
          <button
            onClick={() => {
              replaceParams({
                tab: val === tab ? '' : val,
              })
            }}
            className='row border-2 px-2 py-1'
            key={i}
          >
            <div>{key}</div>
          </button>
        ))}
      </div>

      <div className='col mb-2 space-y-2'>
        {results?.map((x, i) => (
          <Card
            image={x.poster_path || x.profile_path}
            primary={x.title || x.name}
            secondary={query && (x.release_date || x.first_air_date)}
            tertiary={x.overview ?? ''}
            href={`/${x.media_type}/${x.id}`}
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
