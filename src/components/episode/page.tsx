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
  const router = useRouter()

  const searchParams = getSearchParams(router.query)
  const params = paramParse(searchParams)

  const id = params.id || ''
  const season_number = parseInt(params.season_number || '1')
  const episode_number = parseInt(params.episode_number || '1')

  const query = params.query || ''
  const page = parseInt(params.page || '1')
  const curTab = params.tab || 'Info'

  const [res] = useEpisodeQuery(gqlQuery, { id, season_number, episode_number })
  const tv = res.data?.tv
  const ep = res.data?.episode

  function replaceParams(upd: Record<string, string | number | undefined>) {
    router.replace({ query: { ...params, ...upd } })
  }

  const [dbQuery, setDbQuery] = useState(query)
  useTimeout(() => {
    if (dbQuery !== query) {
      replaceParams({ query: dbQuery })
    }
  }, [dbQuery])

  const showQueryBar = ['Cast', 'Guests', 'Crew'].includes(curTab)
  const showPager = ['Cast', 'Guests', 'Crew', 'Stills', 'Videos'].includes(
    curTab,
  )

  const props = { id, season_number, episode_number, query, page }

  return (
    <>
      <div className='m-2'>
        <BackdropCard
          backdrop={ep?.still_path}
          pri={`${tv?.name} S${season_number} E${episode_number}`}
          sec={ep?.name}
          ter={ep?.air_date}
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
            onInputChange={(e) => setDbQuery(e.target.value)}
            onClearClick={() => replaceParams({ query: '' })}
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
            onPageDownClick={() => replaceParams({ page: page - 1 })}
            onPageUpClick={() => replaceParams({ page: page + 1 })}
          />
        )}
      </div>
    </>
  )
}
