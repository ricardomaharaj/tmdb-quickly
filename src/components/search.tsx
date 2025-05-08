import { useState } from 'preact/hooks'
import { useQuery } from 'urql'
import { Card } from '~/components/ui/card'
import { IconChip } from '~/components/ui/chip'
import { Div } from '~/components/ui/div'
import { ErrorMsg } from '~/components/ui/error-msg'
import { FlowRow } from '~/components/ui/flow-row'
import { Frag } from '~/components/ui/frag'
import { InputBar } from '~/components/ui/input-bar'
import { Loading } from '~/components/ui/loading'
import { Pager } from '~/components/ui/pager'
import { searchDoc } from '~/gql/search'
import { useQueryParams } from '~/hooks/query-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { SearchResult } from '~/types/gql'
import { Data, Vars } from '~/types/query'
import { icon } from '~/util/consts'

export function SearchPage() {
  const [params, setParams] = useQueryParams({
    query: '',
    page: '1',
  })

  const pageInt = parseInt(params.page)

  const setQuery = (query: string) => setParams({ query, page: '1' })
  const setPage = (dir: number) => setParams({ page: `${pageInt + dir}` })

  const [db, setDb] = useState(params.query)
  useTimeout(() => (db !== params.query ? setQuery(db) : null), [db])

  const [res] = useQuery<Data, Vars>({
    query: searchDoc,
    variables: {
      query: params.query,
      page: pageInt,
    },
  })

  const { fetching, error } = res
  const search = res.data?.search

  useTitle()

  const movieResults = search?.results?.filter((x) => {
    if (x.media_type === 'movie') return true
    return false
  })

  const tvResults = search?.results?.filter((x) => {
    if (x.media_type === 'tv') return true
    return false
  })

  const peopleResults = search?.results?.filter((x) => {
    if (x.media_type === 'person') return true
    return false
  })

  if (error) return <ErrorMsg msg={error.message} />

  return (
    <div className='flex flex-col gap-2'>
      <InputBar
        defaultValue={params.query}
        onValueChange={(val) => setDb(val)}
        className='text-center text-xl'
      />

      {params.query && (
        <div className='flex flex-row justify-end gap-2'>
          <Pager
            page={pageInt}
            pgUp={() => setPage(+1)}
            pgDown={() => setPage(-1)}
            loading={fetching}
          />
        </div>
      )}

      <Div value={fetching}>
        <Loading />
      </Div>

      <Frag value={movieResults?.length}>
        <IconChip icon={icon.movie} label='Movies' />
        <FlowRow>
          {movieResults?.map((x) => (
            <SearchResultCard x={x} showDate={!!params.query} key={x.id} />
          ))}
        </FlowRow>
      </Frag>

      <Frag value={tvResults?.length}>
        <IconChip icon={icon.tv} label='Shows' />
        <FlowRow>
          {tvResults?.map((x) => (
            <SearchResultCard x={x} showDate={!!params.query} key={x.id} />
          ))}
        </FlowRow>
      </Frag>

      <Frag value={peopleResults?.length}>
        <IconChip icon={icon.people} label='People' />
        <FlowRow>
          {peopleResults?.map((x) => (
            <SearchResultCard x={x} showDate={!!params.query} key={x.id} />
          ))}
        </FlowRow>
      </Frag>
    </div>
  )
}

function SearchResultCard({
  x,
  showDate,
}: {
  x: SearchResult
  showDate?: boolean
}) {
  const img = x.poster_path || x.profile_path
  const name = x.name || x.title
  const date = (x.first_air_date || x.release_date)?.substring(0, 4)

  return (
    <a href={`/${x.media_type}/${x.id}`}>
      <Card img={img} pri={name} ter={showDate ? date : undefined} />
    </a>
  )
}
