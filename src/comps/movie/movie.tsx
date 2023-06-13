import { useRouter } from 'next/router'
import { lazy } from 'react'
import { gql } from 'urql'
import { Card } from '~/comps/card'
import { Pager } from '~/comps/pager'
import { QueryBar } from '~/comps/query-bar'
import { useDbQuery } from '~/util/debounce'
import { useMovieQuery } from './query'
import { Queries, tabs, zQueries } from './z'

const Info = lazy(() => import('./info'))
const Cast = lazy(() => import('./cast'))
const Crew = lazy(() => import('./crew'))
const Images = lazy(() => import('./images'))
const Videos = lazy(() => import('./videos'))

export function Movie() {
  const router = useRouter()
  const queries = zQueries.parse(router.query)
  const { id, tab, query, page } = queries

  const [res] = useMovieQuery({
    query: gql`
      query ($id: String!) {
        movie(id: $id) {
          poster_path
          title
          tagline
          release_date
        }
      }
    `,
    variables: { id },
  })
  const movie = res.data?.movie

  function replaceQueries(update: Partial<Queries>) {
    router.replace({
      query: { ...queries, ...update },
    })
  }

  const { setDbVal } = useDbQuery({ query, replaceQueries })

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
          {tabs.map((x, i) => (
            <button
              className='row border-2 px-2'
              onClick={() => replaceQueries({ tab: x })}
              key={i}
            >
              <div>{x}</div>
            </button>
          ))}
        </div>
        {showQueryBar && (
          <QueryBar
            query={query}
            onInputChange={(e) => setDbVal(e.target.value)}
            onClearClick={() => replaceQueries({ query: '' })}
          />
        )}
        {tab === 'Info' && <Info queries={queries} />}
        {tab === 'Cast' && <Cast queries={queries} />}
        {tab === 'Crew' && <Crew queries={queries} />}
        {tab === 'Images' && <Images queries={queries} />}
        {tab === 'Videos' && <Videos queries={queries} />}
        {showPager && (
          <Pager
            page={page}
            onPageDownClick={() => replaceQueries({ page: page - 1 })}
            onPageUpClick={() => replaceQueries({ page: page + 1 })}
          />
        )}
      </div>
    </>
  )
}
