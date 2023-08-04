import { useState } from 'react'
import { z } from 'zod'
import { Card } from '~/comps/card'
import { Pager } from '~/comps/pager'
import { QueryBar } from '~/comps/query-bar'
import { useRouterQuery } from '~/hooks/router-query'
import { useTimeout } from '~/hooks/timeout'
import { useSearchQuery } from './query'

const tabs = ['', 'movie', 'tv', 'person'] as const
const zTabs = z.enum(tabs)
type Tab = z.infer<typeof zTabs>

const zQueries = z.object({
  query: z.string().default(''),
  page: z.coerce.number().default(1),
  tab: zTabs.default(''),
})

const tabNameMap: Record<Tab, string> = {
  '': '',
  movie: 'Movies',
  tv: 'TV Shows',
  person: 'People',
}

const tabIconMap: Record<Tab, string> = {
  '': '',
  movie: 'icon-[mdi--movie-open]',
  tv: 'icon-[mdi--television-classic]',
  person: 'icon-[mdi--account]',
}

export function HomePage() {
  const queries = useRouterQuery(zQueries)
  const { query, page, tab } = queries.val

  const [res] = useSearchQuery({ query, page })
  const results = res.data?.search?.results?.filter((x) => {
    if (!tab) return true
    if (x.media_type === tab) return true
    return false
  })

  const [dbQuery, setDbQuery] = useState(query)
  useTimeout(() => {
    if (dbQuery !== query) {
      queries.replace({ query: dbQuery })
    }
  }, [dbQuery])

  function setTab(newTab: Tab) {
    if (newTab === tab) {
      queries.replace({ tab: '' })
    } else {
      queries.replace({ tab: newTab })
    }
  }

  const showPager = !!query

  return (
    <div className='m-2'>
      <QueryBar
        query={query}
        onInputChange={(e) => setDbQuery(e.target.value)}
        onClearClick={() => queries.replace({ query: '' })}
      />

      <div className='row mb-2 space-x-2'>
        {tabs.slice(1).map((tab, i) => (
          <button
            onClick={() => setTab(tab)}
            className='row border-2 px-2 py-1'
            key={i}
          >
            <i className={`${tabIconMap[tab]} mr-1 mt-[3px]`} />
            <div>{tabNameMap[tab]}</div>
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
          onPageDownClick={() => queries.replace({ page: page - 1 })}
          onPageUpClick={() => queries.replace({ page: page + 1 })}
        />
      )}
    </div>
  )
}
