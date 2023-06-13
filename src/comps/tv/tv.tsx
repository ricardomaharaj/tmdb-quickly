import { useRouter } from 'next/router'
import { lazy } from 'react'
import { gql } from 'urql'
import { Card } from '~/comps/card'
import { Pager } from '~/comps/pager'
import { QueryBar } from '~/comps/query-bar'
import { useDbQuery } from '~/util/debounce'
import { useTVQuery } from './query'
import { Queries, tabs, zQueries } from './z'

const Info = lazy(() => import('./info'))
const Seasons = lazy(() => import('./seasons'))
const Cast = lazy(() => import('./cast'))
const Crew = lazy(() => import('./crew'))
const Images = lazy(() => import('./images'))
const Videos = lazy(() => import('./videos'))

export function TV() {
  const router = useRouter()
  const queries = zQueries.parse(router.query)
  const { id, tab, query, page } = queries

  const [res] = useTVQuery({
    query: gql`
      query ($id: String!) {
        tv(id: $id) {
          first_air_date
          name
          poster_path
          tagline
        }
      }
    `,
    variables: { id },
  })
  const tv = res.data?.tv

  function replaceQueries(update: Partial<Queries>) {
    router.replace({ query: { ...queries, ...update } })
  }

  const { setDbVal } = useDbQuery({ query, replaceQueries })

  const showQueryBar = tab === 'Cast' || tab === 'Crew'
  const showPager = showQueryBar || tab === 'Images' || tab === 'Videos'

  return (
    <>
      <div className='col m-2'>
        <Card
          image={tv?.poster_path}
          primary={tv?.name}
          secondary={tv?.tagline}
          tertiary={tv?.first_air_date}
        />
        <div className='row my-2 space-x-2 overflow-scroll'>
          {tabs?.map((x, i) => (
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
            onClearClick={() => replaceQueries({ query: '', page: 1 })}
            onInputChange={(e) => setDbVal(e.target.value)}
          />
        )}
        {tab === 'Info' && <Info queries={queries} />}
        {tab === 'Seasons' && <Seasons queries={queries} />}
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
