import { lazy } from 'react'
import { gql } from 'urql'
import { Card } from '~/comps/card'
import { Pager } from '~/comps/pager'
import { QueryBar } from '~/comps/query-bar'
import { TabBar } from '~/comps/tab-bar'
import { useStateObject } from '~/hooks/object'
import { useTimeout } from '~/hooks/timeout'
import { toDateStr } from '~/util/to-date-str'
import { useTVQuery } from './query'
import { tvTabs, useTVState } from './z'

const Info = lazy(() => import('./info'))
const Seasons = lazy(() => import('./seasons'))
const Cast = lazy(() => import('./cast'))
const Crew = lazy(() => import('./crew'))
const Images = lazy(() => import('./images'))
const Videos = lazy(() => import('./videos'))

const gqlQuery = gql`
  query ($id: String!) {
    tv(id: $id) {
      first_air_date
      name
      poster_path
      tagline
    }
  }
`

export function TVPage() {
  const { queries } = useTVState()
  const { id, tab, query, page } = queries.val

  const [res] = useTVQuery(gqlQuery, { id })
  const tv = res.data?.tv

  const debounce = useStateObject(query)
  useTimeout(() => {
    if (debounce.val !== query) {
      queries.replace({ query: debounce.val })
    }
  }, [debounce.val])

  const showQueryBar = ['Cast', 'Crew'].includes(tab)
  const showPager = ['Cast', 'Crew', 'Images', 'Videos'].includes(tab)

  return (
    <>
      <div className='col m-2'>
        <Card
          image={tv?.poster_path}
          primary={tv?.name}
          secondary={tv?.tagline}
          tertiary={toDateStr(tv?.first_air_date)}
        />

        <TabBar
          tabs={tvTabs}
          setTab={(newTab) => queries.replace({ tab: newTab })}
        />

        {showQueryBar && (
          <QueryBar
            query={query}
            onClearClick={() => queries.replace({ query: '', page: 1 })}
            onInputChange={(e) => debounce.set(e.target.value)}
          />
        )}

        {tab === 'Info' && <Info queries={queries.val} />}
        {tab === 'Seasons' && <Seasons queries={queries.val} />}
        {tab === 'Cast' && <Cast queries={queries.val} />}
        {tab === 'Crew' && <Crew queries={queries.val} />}
        {tab === 'Images' && <Images queries={queries.val} />}
        {tab === 'Videos' && <Videos queries={queries.val} />}

        {showPager && (
          <Pager
            page={page}
            onPageDownClick={() => queries.replace({ page: page - 1 })}
            onPageUpClick={() => queries.replace({ page: page + 1 })}
          />
        )}
      </div>
    </>
  )
}
