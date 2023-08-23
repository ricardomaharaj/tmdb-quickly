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
import { useTVQuery } from './query'

const Info = lazy(() => import('./info'))
const Seasons = lazy(() => import('./seasons'))
const Cast = lazy(() => import('./cast'))
const Crew = lazy(() => import('./crew'))
const Images = lazy(() => import('./images'))
const Videos = lazy(() => import('./videos'))

const gqlQuery = gql`
  query ($id: String!) {
    tv(id: $id) {
      backdrop_path
      name
      tagline
      first_air_date
    }
  }
`

const tabs = ['Info', 'Seasons', 'Cast', 'Crew', 'Images', 'Videos']

export function TVPage() {
  const router = useRouter()

  const searchParams = getSearchParams(router.query)
  const params = paramParse(searchParams)

  const id = params.id || ''
  const query = params.query || ''
  const page = parseInt(params.page || '1')
  const tab = params.tab || 'Info'

  function replaceParams(upd: Record<string, string | number | undefined>) {
    router.replace({ query: { ...params, ...upd } })
  }

  const [dbQuery, setDbQuery] = useState(query)
  useTimeout(() => {
    if (dbQuery !== query) {
      replaceParams({ query: dbQuery })
    }
  }, [dbQuery])

  const [res] = useTVQuery(gqlQuery, { id })
  const tv = res.data?.tv

  const showQueryBar = ['Cast', 'Crew'].includes(tab)
  const showPager = ['Cast', 'Crew', 'Images', 'Videos'].includes(tab)

  const props = { id, query, page }

  return (
    <>
      <div className='col m-2'>
        <BackdropCard
          backdrop={tv?.backdrop_path}
          pri={tv?.name}
          sec={tv?.tagline}
          ter={tv?.first_air_date}
          className='xl:p-14'
        />

        <TabBar
          tabs={tabs}
          currentTab={tab}
          onTabClicked={(tab) => replaceParams({ tab })}
        />

        {showQueryBar && (
          <QueryBar
            query={query}
            onInputChange={(e) => setDbQuery(e.target.value)}
            onClearClick={() => replaceParams({ query: '', page: 1 })}
          />
        )}

        {tab === 'Info' && <Info {...props} />}
        {tab === 'Seasons' && <Seasons {...props} />}
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
