import { lazy } from 'react'
import { gql } from 'urql'
import { Card } from '~/comps/card'
import { Pager } from '~/comps/pager'
import { QueryBar } from '~/comps/query-bar'
import { TabBar } from '~/comps/tab-bar'
import { useStateObject } from '~/hooks/object'
import { useTimeout } from '~/hooks/timeout'
import { toDateStr } from '~/util/to-date-str'
import { useSeasonQuery } from './query'
import { seasonTabs, useSeasonState } from './z'

const Info = lazy(() => import('./info'))
const Episodes = lazy(() => import('./episodes'))
const Cast = lazy(() => import('./cast'))
const Crew = lazy(() => import('./crew'))
const Images = lazy(() => import('./images'))
const Videos = lazy(() => import('./videos'))

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!) {
    season(id: $id, season_number: $season_number) {
      name
      overview
      poster_path
      air_date
    }
    tv(id: $id) {
      name
    }
  }
`

export function SeasonPage() {
  const { queries } = useSeasonState()
  const { id, season_number, tab, query, page } = queries.val

  const [res] = useSeasonQuery(gqlQuery, { id, season_number })
  const season = res.data?.season
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
      <div className='m-2'>
        <Card
          image={season?.poster_path}
          primary={tv?.name}
          secondary={season?.name}
          tertiary={toDateStr(season?.air_date)}
        />

        <TabBar
          tabs={seasonTabs}
          setTab={(newTab) => queries.replace({ tab: newTab })}
        />

        {showQueryBar && (
          <QueryBar
            query={query}
            onClearClick={() => {
              queries.replace({ query: '' })
            }}
            onInputChange={(e) => {
              debounce.set(e.currentTarget.value)
            }}
          />
        )}

        {tab === 'Info' && <Info queries={queries.val} />}
        {tab === 'Episodes' && <Episodes queries={queries.val} />}
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
