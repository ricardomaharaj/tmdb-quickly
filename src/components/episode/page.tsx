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
import { useEpisodeQuery } from './query'

const Info = lazy(() => import('./info'))
const Cast = lazy(() => import('./cast'))
const Crew = lazy(() => import('./crew'))
const Stills = lazy(() => import('./stills'))
const Guests = lazy(() => import('./guests'))

const tabs = ['Info', 'Cast', 'Guests', 'Crew', 'Stills', 'Videos']

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!, $episode_number: Int!) {
    tv(id: $id) {
      name
    }
    episode(
      episode_number: $episode_number
      id: $id
      season_number: $season_number
    ) {
      name
      air_date
      still_path
    }
  }
`

export function EpisodePage() {
  const [params, replace] = useParams({
    id: '',
    season_number: '1',
    episode_number: '1',
    query: '',
    page: '1',
    tab: 'Info',
  })

  const { id, query, tab: curTab } = params
  const season_number = parseInt(params.season_number)
  const episode_number = parseInt(params.episode_number)
  const page = parseInt(params.page)

  const [res] = useEpisodeQuery(gqlQuery, { id, season_number, episode_number })
  const tv = res.data?.tv
  const ep = res.data?.episode

  const [debounce, setDebounce] = useState(query)
  useTimeout(() => {
    if (debounce !== query) {
      replace({ query: debounce, page: '1' })
    }
  }, [debounce])

  const setPage = (dir: number) => replace({ page: (page + dir).toString() })

  const showQueryBar = ['Cast', 'Guests', 'Crew'].includes(curTab)
  const showPager = ['Cast', 'Guests', 'Crew', 'Stills', 'Videos'].includes(
    curTab,
  )

  const props = { id, season_number, episode_number, query, page }

  return (
    <div className='m-2'>
      <Head>
        <title>
          TMDB NEXT | {tv?.name} S{season_number} E{episode_number}
        </title>
      </Head>

      <BackdropCard
        backdrop={ep?.still_path}
        pri={`${tv?.name} S${season_number} E${episode_number}`}
        sec={ep?.name}
        ter={dateStr(ep?.air_date)}
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
      {curTab === 'Cast' && <Cast {...props} />}
      {curTab === 'Guests' && <Guests {...props} />}
      {curTab === 'Crew' && <Crew {...props} />}
      {curTab === 'Stills' && <Stills {...props} />}

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
