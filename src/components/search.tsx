import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'urql'
import { Card } from '~/components/ui/card'
import { Div } from '~/components/ui/div'
import { ErrorMsg } from '~/components/ui/error-msg'
import { CardGrid } from '~/components/ui/grid'
import { InputBar } from '~/components/ui/input-bar'
import { Loading } from '~/components/ui/loading'
import { Pager } from '~/components/ui/pager'
import { Taber } from '~/components/ui/taber'
import { searchDoc } from '~/gql/search'
import { useSp } from '~/hooks/search-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'

const filters = [
  { key: 'Movies', val: 'movie' },
  { key: 'Shows', val: 'tv' },
  { key: 'People', val: 'person' },
]

export function SearchPage() {
  const [sp, rplSp] = useSp({
    query: '',
    page: '1',
    filter: '',
  })

  const pageInt = parseInt(sp.page)

  const setQuery = (query: string) => rplSp({ query, page: '1' })
  const setPage = (dir: number) => rplSp({ page: `${pageInt + dir}` })
  const setFilter = (filter: string) => {
    const sameFilter = sp.filter === filter
    rplSp({ filter: sameFilter ? '' : filter, page: '1' })
  }

  const [db, setDb] = useState(sp.query)
  useTimeout(() => (db !== sp.query ? setQuery(db) : null), [db])

  const [res] = useQuery({
    query: searchDoc,
    variables: {
      query: sp.query,
      page: pageInt,
    },
  })

  const { fetching, error } = res
  const search = res.data?.search

  useTitle()

  const results = search?.results?.filter((x) => {
    if (sp.filter === '') return true
    if (x.media_type === sp.filter) return true
    return false
  })

  if (error) return <ErrorMsg msg={error.message} />

  return (
    <div className='flex flex-col gap-2'>
      <InputBar
        defaultValue={sp.query}
        onValueChange={(val) => setDb(val)}
        className='text-center text-xl'
      />

      <Taber tabs={filters} activeTab={sp.filter} onTabClicked={setFilter} />

      <Div value={fetching}>
        <Loading />
      </Div>

      <Div value={!fetching}>
        <CardGrid>
          {results?.map((x) => {
            const img = x.poster_path || x.profile_path
            const name = x.name || x.title
            const date = (x.first_air_date || x.release_date)?.substring(0, 4)

            return (
              <Link
                href={`/${x.media_type}/${x.id}`}
                key={`${x.media_type} - ${x.id}`}
              >
                <Card img={img} pri={name} ter={sp.query ? date : undefined} />
              </Link>
            )
          })}
        </CardGrid>
      </Div>

      {sp.query && (
        <Pager
          page={pageInt}
          pgUp={() => setPage(1)}
          pgDown={() => setPage(-1)}
        />
      )}
    </div>
  )
}
