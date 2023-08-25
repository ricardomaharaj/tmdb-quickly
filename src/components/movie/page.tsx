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
import { useMovieQuery } from './query'

const Info = lazy(() => import('./info'))
const Cast = lazy(() => import('./cast'))
const Crew = lazy(() => import('./crew'))
const Images = lazy(() => import('./images'))
const Videos = lazy(() => import('./videos'))

const tabs = ['Info', 'Cast', 'Crew', 'Images', 'Videos']

const gqlQuery = gql`
  query ($id: String!) {
    movie(id: $id) {
      backdrop_path
      title
      tagline
      release_date
    }
  }
`

export function MoviePage() {
  const [params, replace] = useParams({
    id: '',
    query: '',
    page: '1',
    tab: 'Info',
  })

  const { id, query, tab: curTab } = params
  const page = parseInt(params.page)

  const [res] = useMovieQuery(gqlQuery, { id })
  const movie = res.data?.movie

  const [debounce, setDebounce] = useState(query)
  useTimeout(() => {
    if (debounce !== query) {
      replace({ query: debounce, page: '1' })
    }
  }, [debounce])

  const setPage = (dir: number) => replace({ page: (page + dir).toString() })

  const showQueryBar = ['Cast', 'Crew'].includes(curTab)
  const showPager = ['Cast', 'Crew', 'Images', 'Videos'].includes(curTab)

  const props = { id, query, page }

  return (
    <div className='m-2'>
      <Head>
        <title>TMDB NEXT | {movie?.title}</title>
      </Head>

      <BackdropCard
        backdrop={movie?.backdrop_path}
        pri={movie?.title}
        sec={movie?.tagline}
        ter={dateStr(movie?.release_date)}
        className='xl:p-16'
      />

      <TabBar
        tabs={tabs}
        currentTab={curTab}
        onTabClicked={(tab) => replace({ tab, page: '1' })}
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
