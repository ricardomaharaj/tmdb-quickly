import { useRoute } from 'preact-iso'
import { useState } from 'preact/hooks'
import { useQuery } from 'urql'

import { personDoc } from '~/app/gql/person'
import { useQueryParams } from '~/app/hooks/query-params'
import { useTimeout } from '~/app/hooks/timeout'
import { useTitle } from '~/app/hooks/title'
import { Data, Vars } from '~/app/types/query'
import { iconCodes } from '~/app/util/consts'
import { genMediaStr } from '~/app/util/media-str'

import { Bio } from './ui/bio'
import { Btn } from './ui/btn'
import { Bubble } from './ui/bubble'
import { Card } from './ui/card'
import { IconChip } from './ui/chip'
import { Div } from './ui/div'
import { ErrorMsg } from './ui/error-msg'
import { FlowRow } from './ui/flow-row'
import { Frag } from './ui/frag'
import { ImageLink } from './ui/image-link'
import { InputBar } from './ui/input-bar'
import { Loading } from './ui/loading'
import { Pager } from './ui/pager'

const filters = [
  { key: 'Movies', val: 'movie' },
  { key: 'Shows', val: 'tv' },
] as const

const filterIcons = {
  Movies: iconCodes.movie,
  Shows: iconCodes.tv,
} as const

export function PersonPage() {
  const route = useRoute()
  const [params, setParams] = useQueryParams({
    query: '',
    page: '1',
    filter: '',
  })

  const id = route.params.id

  const pageInt = parseInt(params.page)

  const setQuery = (query: string) => setParams({ query, page: '1' })
  const setPage = (dir: number) => setParams({ page: `${pageInt + dir}` })
  const setFilter = (filter?: string) =>
    setParams({ filter: filter === params.filter ? '' : filter, page: '1' })

  const [debounce, setDebounce] = useState(params.query)
  useTimeout(
    () => (debounce !== params.query ? setQuery(debounce) : null),
    [debounce],
  )

  const [res] = useQuery<Data, Vars>({
    query: personDoc,
    variables: {
      id: id,
      query: params.query,
      filter: params.filter,
      page: pageInt,
    },
  })

  const { fetching, error } = res
  const person = res.data?.person

  useTitle(person?.name)

  if (fetching && !res.data) return <Loading />
  if (error) return <ErrorMsg msg={error.message} />

  return (
    <div className='flex flex-col gap-2'>
      <Bubble className='flex flex-col gap-2'>
        <Div value={person?.name} className='text-xl font-bold' />
        <Bio bio={person?.biography} />
      </Bubble>

      <Frag value={person?.images?.profiles?.length}>
        <IconChip icon={iconCodes.image} label='Images' />
        <FlowRow>
          {person?.images?.profiles?.map((x) => (
            <ImageLink x={x} variant='portrait' />
          ))}
        </FlowRow>
      </Frag>

      <div className='flex flex-row gap-2'>
        <InputBar
          defaultValue={params.query}
          onValueChange={(val) => setDebounce(val)}
        />
        <Pager
          page={pageInt}
          pgUp={() => setPage(+1)}
          pgDown={() => setPage(-1)}
          loading={fetching}
        />
      </div>

      <div className='flex flex-row justify-end gap-2'>
        {filters.map((x) => (
          <Btn
            className='flex flex-row items-center gap-2 px-4 py-3'
            isActive={params.filter === x.val}
            onClick={() => setFilter(x.val)}
          >
            <i
              className={`${filterIcons[x.key]} text-xl`}
              title={`Show only ${x.key}`}
            />
          </Btn>
        ))}
      </div>

      <Frag value={person?.combined_credits?.cast?.length}>
        <IconChip icon={iconCodes.people} label='Cast' />
        <FlowRow>
          {person?.combined_credits?.cast?.map((x) => {
            const sec = genMediaStr({
              pri: x.character,
              count: x.episode_count,
              rmVoice: true,
            })

            return (
              <a
                href={`/${x.media_type}/${x.id}`}
                key={`${x.media_type} - ${x.id}`}
              >
                <Card
                  img={x.poster_path}
                  pri={x.name || x.title}
                  sec={sec}
                  ter={x.first_air_date || x.release_date}
                />
              </a>
            )
          })}
        </FlowRow>
      </Frag>

      <Frag value={person?.combined_credits?.crew?.length}>
        <IconChip icon={iconCodes.peopleAlt} label='Crew' />
        <FlowRow>
          {person?.combined_credits?.crew?.map((x) => {
            const sec = genMediaStr({
              pri: x.job,
              count: x.episode_count,
              rmVoice: true,
            })

            return (
              <a
                href={`/${x.media_type}/${x.id}`}
                key={`${x.media_type} - ${x.id}`}
              >
                <Card
                  img={x.poster_path}
                  pri={x.name || x.title}
                  sec={sec}
                  ter={x.first_air_date || x.release_date}
                />
              </a>
            )
          })}
        </FlowRow>
      </Frag>
    </div>
  )
}
