import { lazy } from 'react'
import { gql } from 'urql'
import { Card } from '~/comps/card'
import { Pager } from '~/comps/pager'
import { QueryBar } from '~/comps/query-bar'
import { useObject } from '~/hooks/object'
import { useTimeout } from '~/hooks/timeout'
import { useMovieQuery } from './query'
import { movieTabs, useMovieState } from './z'

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

  const debouncedQuery = useObject(query)
  useTimeout(() => {
    if (debouncedQuery.val !== query) {
      queries.replace({ query: debouncedQuery.val })
    }
  }, [debouncedQuery.val])

  const showQueryBar = tab === 'Cast' || tab === 'Crew'
  const showPager = tab !== 'Info'

  return (
    <>
      <div className='col m-2'>
        <Card
          image={movie?.poster_path}
          primary={movie?.title}
          secondary={movie?.tagline}
          tertiary={movie?.release_date}
        />
        <div className='row my-2 space-x-2'>
          {movieTabs.map((x, i) => (
            <button
              className='row border-2 px-2'
              onClick={() => queries.replace({ tab: x })}
              key={i}
            >
              <div>{x}</div>
            </button>
          ))}
        </div>
        {showQueryBar && (
          <QueryBar
            query={query}
            onInputChange={(e) => debouncedQuery.set(e.target.value)}
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
