import { useRouter } from 'next/router'
import { lazy } from 'react'
import { gql, useQuery } from 'urql'
import { Card } from '~/comps/card'
import { Pager } from '~/comps/pager'
import { QueryBar } from '~/comps/query-bar'
import { ID } from '~/types/id'
import { TV } from '~/types/tmdb'
import { useDbQuery } from '~/util/debounce'
import { Queries, tabs, zQueries } from './types'

const Info = lazy(() => import('./info'))
const Seasons = lazy(() => import('./seasons'))
const Cast = lazy(() => import('./cast'))

const query = gql`
  query ($id: ID!) {
    tv(id: $id) {
      name
      poster_path
      first_air_date
      tagline
    }
  }
`

type Data = { tv?: TV }
type Vars = { id: ID }
function useTVQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

export function TV() {
  const router = useRouter()
  const queries = zQueries.parse(router.query)
  const { id, tab, query, page } = queries

  const [res] = useTVQuery({ id })
  const tv = res.data?.tv

  function replaceQueries(update: Partial<Queries>) {
    router.replace({ query: { id, tab, query, page, ...update } })
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
            onClearClick={() => replaceQueries({ query: '' })}
            onInputChange={(e) => setDbVal(e.target.value)}
          />
        )}
        {tab === 'Info' && <Info queries={queries} />}
        {tab === 'Seasons' && <Seasons id={id} />}
        {tab === 'Cast' && <Cast queries={queries} />}
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
