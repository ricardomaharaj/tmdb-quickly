import { useRouter } from 'next/router'
import { lazy, useState } from 'react'
import { gql } from 'urql'
import { Card } from '~/comps/card'
import { Pager } from '~/comps/pager'
import { QueryBar } from '~/comps/query-bar'
import { TabBar } from '~/comps/tab-bar'
import { useTimeout } from '~/hooks/timeout'
import { paramParse } from '~/util/param-parse'
import { getSearchParams } from '~/util/search-params'
import { toDateStr } from '~/util/to-date-str'
import { useSeasonQuery } from './query'

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

const tabs = ['Info', 'Episodes', 'Cast', 'Crew', 'Images', 'Videos']

export function SeasonPage() {
  const router = useRouter()

  const searchParams = getSearchParams(router.query)
  const params = paramParse(searchParams)

  const id = params.id || ''
  const season_number = parseInt(params.season_number || '1')

  const query = params.query || ''
  const page = parseInt(params.page || '1')
  const tab = params.tab || 'Info'

  const [res] = useSeasonQuery(gqlQuery, { id, season_number })
  const season = res.data?.season
  const tv = res.data?.tv

  function replaceParams(upd: Record<string, string | number | undefined>) {
    router.replace({ query: { ...params, ...upd } })
  }

  const [dbQuery, setDbQuery] = useState(query)
  useTimeout(() => {
    if (dbQuery !== query) {
      replaceParams({ query: dbQuery })
    }
  }, [dbQuery])

  const showQueryBar = ['Cast', 'Crew'].includes(tab)
  const showPager = ['Cast', 'Crew', 'Images', 'Videos'].includes(tab)

  const props = { id, season_number, query, page }

  return (
    <>
      <div className='m-2'>
        <Card
          image={season?.poster_path}
          primary={tv?.name}
          secondary={season?.name}
          tertiary={toDateStr(season?.air_date)}
        />

        <TabBar tabs={tabs} setTab={(tab) => replaceParams({ tab })} />

        {showQueryBar && (
          <QueryBar
            query={query}
            onClearClick={() => replaceParams({ query: '', page: 1 })}
            onInputChange={(e) => setDbQuery(e.target.value)}
          />
        )}

        {tab === 'Info' && <Info {...props} />}
        {tab === 'Episodes' && <Episodes {...props} />}
        {tab === 'Cast' && <Cast {...props} />}
        {tab === 'Crew' && <Crew {...props} />}
        {tab === 'Images' && <Images {...props} />}
        {tab === 'Videos' && <Videos {...props} />}

        {showPager && (
          <Pager
            page={page}
            onPageDownClick={() => replaceParams({ page: page - 1 })}
            onPageUpClick={() => replaceParams({ page: page + 1 })}
          />
        )}
      </div>
    </>
  )
}
