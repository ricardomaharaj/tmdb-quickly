import { lazy } from 'react'
import { gql } from 'urql'
import { Card } from '~/comps/card'
import { Pager } from '~/comps/pager'
import { QueryBar } from '~/comps/query-bar'
import { TabBar } from '~/comps/tab-bar'
import { useStateObject } from '~/hooks/object'
import { useTimeout } from '~/hooks/timeout'
import { useMovieQuery } from './query'
import { MovieTab, movieTabs, useMovieState } from './z'

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
export function MoviePage() {
  const { queries } = useMovieState()
  const { id, tab, query, page } = queries.val

  const [res] = useMovieQuery(gqlQuery, { id, query, page })
  const movie = res.data?.movie

  const debounce = useStateObject(query)
  useTimeout(() => {
    if (debounce.val !== query) {
      queries.replace({ query: debounce.val })
    }
  }, [debounce.val])

  const showPager = ['Cast', 'Crew', 'Images', 'Videos'].includes(tab)
  const showQueryBar = ['Cast', 'Crew'].includes(tab)

  function setTab(tab: MovieTab) {
    queries.replace({ tab })
  }

  return (
    <>
      <div className='col m-2'>
        <Card
          image={movie?.poster_path}
          primary={movie?.title}
          secondary={movie?.tagline}
          tertiary={movie?.release_date}
        />
        <TabBar tabs={movieTabs} setTab={setTab} />
        {showQueryBar && (
          <QueryBar
            query={query}
            onInputChange={(e) => debounce.set(e.target.value)}
            onClearClick={() => queries.replace({ query: '' })}
          />
        )}
        {tab === 'Info' && <Info queries={queries.val} />}
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
