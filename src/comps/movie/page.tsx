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
  const tab = params.tab || 'Info'

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

  const showQueryBar = ['Cast', 'Crew'].includes(tab)
  const showPager = ['Cast', 'Crew', 'Images', 'Videos'].includes(tab)

  const props = { id, query, page }

  return (
    <>
      <div className='col m-2'>
        <Card
          image={movie?.poster_path}
          primary={movie?.title}
          secondary={movie?.tagline}
          tertiary={movie?.release_date}
        />

        <TabBar tabs={tabs} setTab={(tab) => replaceParams({ tab })} />

        {showQueryBar && (
          <QueryBar
            query={query}
            onInputChange={(e) => setDbQuery(e.target.value)}
            onClearClick={() => replaceParams({ query: '', page: 1 })}
          />
        )}

        {tab === 'Info' && <Info {...props} />}
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
