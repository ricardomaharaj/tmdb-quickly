import { useRouter } from 'next/router'
import { lazy, useState } from 'react'
import { gql } from 'urql'
import { BackdropCard } from '~/components/reusable/backdrop-card'
import { Pager } from '~/components/reusable/pager'
import { QueryBar } from '~/components/reusable/query-bar'
import { TabBar } from '~/components/reusable/tab-bar'
import { useTimeout } from '~/hooks/timeout'
import { paramParse } from '~/util/param-parse'
import { getSearchParams } from '~/util/search-params'
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
      air_date
      episodes {
        episode_number
      }
    }
    tv(id: $id) {
      backdrop_path
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
  const curTab = params.tab || 'Info'

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

  const showQueryBar = ['Cast', 'Crew'].includes(curTab)
  const showPager = ['Cast', 'Crew', 'Images', 'Videos'].includes(curTab)

  const props = { id, season_number, query, page }

  return (
    <>
      <div className='m-2'>
        <BackdropCard
          backdrop={tv?.backdrop_path}
          pri={tv?.name}
          sec={season?.name}
          ter={season?.air_date}
          className='xl:p-14'
        />

        <TabBar
          tabs={tabs}
          currentTab={curTab}
          onTabClicked={(tab) => replaceParams({ tab })}
        />

        {showQueryBar && (
          <QueryBar
            query={query}
            onClearClick={() => replaceParams({ query: '', page: 1 })}
            onInputChange={(e) => setDbQuery(e.target.value)}
          />
        )}

        {curTab === 'Info' && <Info {...props} />}
        {curTab === 'Episodes' && <Episodes {...props} />}
        {curTab === 'Cast' && <Cast {...props} />}
        {curTab === 'Crew' && <Crew {...props} />}
        {curTab === 'Images' && <Images {...props} />}
        {curTab === 'Videos' && <Videos {...props} />}

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
