import Head from 'next/head'
import { lazy, useState } from 'react'
import { gql } from 'urql'
import { BackdropCard } from '~/components/reusable/backdrop-card'
import { Pager } from '~/components/reusable/pager'
import { QueryBar } from '~/components/reusable/query-bar'
import { TabBar } from '~/components/reusable/tab-bar'
import { useParams } from '~/hooks/params'
import { useTimeout } from '~/hooks/timeout'
import { dateStr } from '~/util/date-str'
import { useSeasonQuery } from './query'

const Info = lazy(() => import('./info'))
const Episodes = lazy(() => import('./episodes'))
const Cast = lazy(() => import('./cast'))
const Crew = lazy(() => import('./crew'))
const Images = lazy(() => import('./images'))
const Videos = lazy(() => import('./videos'))

const tabs = ['Info', 'Episodes', 'Cast', 'Crew', 'Images', 'Videos']

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

export function SeasonPage() {
  const [params, replace] = useParams({
    id: '',
    season_number: '1',
    query: '',
    page: '1',
    tab: 'Info',
  })

  const { id, query, tab: curTab } = params

  const season_number = parseInt(params.season_number)
  const page = parseInt(params.page)

  const [res] = useSeasonQuery(gqlQuery, { id, season_number })
  const season = res.data?.season
  const tv = res.data?.tv

  const [debounce, setDebounce] = useState(query)
  useTimeout(() => {
    if (debounce !== query) {
      replace({ query: debounce, page: '1' })
    }
  }, [debounce])

  const setPage = (dir: number) => replace({ page: (page + dir).toString() })

  const showQueryBar = ['Cast', 'Crew'].includes(curTab)
  const showPager = ['Cast', 'Crew', 'Images', 'Videos'].includes(curTab)

  const props = { id, season_number, query, page }

  return (
    <div className='m-2'>
      <Head>
        <title>
          TMDB NEXT | {tv?.name} Season {season_number}
        </title>
      </Head>

      <BackdropCard
        backdrop={tv?.backdrop_path}
        pri={tv?.name}
        sec={season?.name}
        ter={dateStr(season?.air_date)}
        className='xl:p-16'
      />

      <TabBar
        tabs={tabs}
        currentTab={curTab}
        onTabClicked={(tab) => replace({ tab })}
      />

      {showQueryBar && (
        <QueryBar
          query={query}
          onInputChange={(e) => setDebounce(e.target.value)}
          onClearClick={() => replace({ query: '', page: '1' })}
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
          onPageDownClick={() => setPage(-1)}
          onPageUpClick={() => setPage(1)}
        />
      )}
    </div>
  )
}
