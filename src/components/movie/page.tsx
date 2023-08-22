import { useRouter } from 'next/router'
import { lazy, useState } from 'react'
import { gql } from 'urql'
import { HeaderCard } from '~/components/reusable/header-card'
import { Pager } from '~/components/reusable/pager'
import { QueryBar } from '~/components/reusable/query-bar'
import { TabBar } from '~/components/reusable/tab-bar'
import { useTimeout } from '~/hooks/timeout'
import { paramParse } from '~/util/param-parse'
import { getSearchParams } from '~/util/search-params'
import { useMovieQuery } from './query'

const Info = lazy(() => import('./info'))
const Cast = lazy(() => import('./cast'))
const Crew = lazy(() => import('./crew'))
const Images = lazy(() => import('./images'))
const Videos = lazy(() => import('./videos'))

const gqlQuery = gql`
  query ($id: String!) {
    movie(id: $id) {
      poster_path
      backdrop_path
      title
      tagline
      release_date
    }
  }
`

const tabs = ['Info', 'Cast', 'Crew', 'Images', 'Videos']

export function MoviePage() {
  const router = useRouter()

  const searchParams = getSearchParams(router.query)
  const params = paramParse(searchParams)

  const id = params.id || ''
  const query = params.query || ''
  const page = parseInt(params.page || '1')
  const curTab = params.tab || 'Info'

  const [res] = useMovieQuery(gqlQuery, { id })
  const movie = res.data?.movie

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

  const props = { id, query, page }

  return (
    <>
      <div className='col m-2'>
        <HeaderCard
          backdrop={movie?.backdrop_path}
          poster={movie?.poster_path}
          pri={movie?.title}
          sec={movie?.tagline}
          ter={movie?.release_date}
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
            onClearClick={() => replaceParams({ query: '', page: 1 })}
          />
        )}

        {curTab === 'Info' && <Info {...props} />}
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
