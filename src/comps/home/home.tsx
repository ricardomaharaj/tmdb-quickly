import { useRouter } from 'next/router'
import { Card } from '~/comps/card'
import { Pager } from '~/comps/pager'
import { QueryBar } from '~/comps/query-bar'
import { useDbQuery } from '~/util/debounce'
import { useSearchQuery } from './query'
import type { Filter, Queries } from './z'
import { filters, zQueries } from './z'

const filterMap: Record<Filter, string> = {
  '': '',
  movie: 'Movies',
  tv: 'TV Shows',
  person: 'People',
}

const iconMap: Record<Filter, string> = {
  '': '',
  movie: 'icon-[mdi--movie-open]',
  tv: 'icon-[mdi--television-classic]',
  person: 'icon-[mdi--account]',
}

export function Home() {
  const router = useRouter()
  const queries = zQueries.parse(router.query)
  const { filter, query, page } = queries

  const [res] = useSearchQuery({ query, page })
  const results = res.data?.search?.results?.filter((x) => {
    if (!filter) return true
    if (x.media_type === filter) return true
    return false
  })

  function replaceQueries(update: Partial<Queries>) {
    router.replace({
      query: { ...queries, ...update },
    })
  }

  const { setDbVal } = useDbQuery({ query, replaceQueries })

  function setFilter(f: Filter) {
    if (f === filter) {
      replaceQueries({ filter: '' })
    } else {
      replaceQueries({ filter: f })
    }
  }

  const showPager = !!query

  return (
    <div className='m-2'>
      <QueryBar
        query={query}
        onInputChange={(e) => setDbVal(e.target.value)}
        onClearClick={() => replaceQueries({ query: '' })}
      />
      <div className='row mb-2 space-x-2'>
        {filters.slice(1).map((x, i) => (
          <button
            onClick={() => setFilter(x)}
            className='row border-2 px-2 py-1'
            key={i}
          >
            <div className={`${iconMap[x]} mr-1 mt-[3px]`}></div>
            <div>{filterMap[x]}</div>
          </button>
        ))}
      </div>
      <div className='col mb-2 space-y-2'>
        {results?.map((x, i) => (
          <Card
            image={x.poster_path || x.profile_path}
            primary={x.title || x.name}
            secondary={query && (x.release_date || x.first_air_date)}
            tertiary={x.overview ?? ''}
            href={`/${x.media_type}/${x.id}`}
            key={i}
          />
        ))}
      </div>
      {showPager && (
        <Pager
          page={page}
          onPageDownClick={() => replaceQueries({ page: page - 1 })}
          onPageUpClick={() => replaceQueries({ page: page + 1 })}
        />
      )}
    </div>
  )
}
