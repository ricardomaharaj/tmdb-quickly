import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'urql'
import { Card } from '~/components/ui/card'
import { Div } from '~/components/ui/div'
import { ErrorMsg } from '~/components/ui/error-msg'
import { CardGrid, MediaGrid } from '~/components/ui/grid'
import { Img } from '~/components/ui/img'
import { InputBar } from '~/components/ui/input-bar'
import { Loading } from '~/components/ui/loading'
import { Pager } from '~/components/ui/pager'
import { Taber } from '~/components/ui/taber'
import { personDoc } from '~/gql/person'
import { useSp } from '~/hooks/search-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { imgUrls } from '~/util/img'
import { genShowText } from '~/util/show-text'

const tabs = [
  { key: 'Cast', val: 'Cast' },
  { key: 'Crew', val: 'Crew' },
  { key: 'Images', val: 'Images' },
]

const filters = [
  { key: 'Movies', val: 'movie' },
  { key: 'Shows', val: 'tv' },
]

export function PersonPage() {
  const router = useRouter()
  const params = router.query as Record<string, string | undefined>

  const [sp, rplSp] = useSp({
    query: '',
    page: '1',
    tab: 'Cast',
    filter: '',

    id: '',
  })

  const pageInt = parseInt(sp.page)

  const setQuery = (query: string) => rplSp({ query, page: '1' })
  const setPage = (dir: number) => rplSp({ page: `${pageInt + dir}` })
  const setTab = (tab: string) => rplSp({ tab, page: '1' })
  const setFilter = (filter: string) => {
    const sameFilter = sp.filter === filter
    rplSp({ filter: sameFilter ? '' : filter, page: '1' })
  }

  const [db, setDb] = useState(sp.query)
  useTimeout(() => (db !== sp.query ? setQuery(db) : null), [db])

  const [res] = useQuery({
    query: personDoc,
    variables: {
      id: params.id!,
      query: sp.query,
      page: pageInt,
      filter: sp.filter,
    },
  })

  const { data, fetching, error } = res
  const person = data?.person

  useTitle(person?.name)

  const showInputBar = ['Cast', 'Crew'].includes(sp.tab)
  const showFilterBar = showInputBar
  const showPager = ['Cast', 'Crew', 'Images'].includes(sp.tab)

  if (error) return <ErrorMsg msg={error.message} />

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row rounded-xl bg-slate-800 p-2'>
        {person?.profile_path && (
          <Img
            src={`${imgUrls.w220h330}${person.profile_path}`}
            className='mr-2 max-h-[200px] rounded-xl'
          />
        )}
        <Div value={person?.name} />
      </div>

      <Taber tabs={tabs} activeTab={sp.tab} onTabClicked={setTab} />

      {showFilterBar && (
        <Taber tabs={filters} activeTab={sp.filter} onTabClicked={setFilter} />
      )}

      {showInputBar && (
        <InputBar
          defaultValue={sp.query}
          onValueChange={(val) => setDb(val)}
          className='pl-3'
        />
      )}

      <Div value={fetching}>
        <Loading />
      </Div>

      {sp.tab === 'Cast' && (
        <CardGrid>
          {person?.combined_credits?.cast?.map((x) => {
            const sec = genShowText({
              pri: x.character,
              count: x.episode_count,
              rmVoice: true,
            })

            return (
              <Link
                href={`/${x.media_type}/${x.id}`}
                key={`${x.media_type} - ${x.id}`}
              >
                <Card
                  img={x.poster_path}
                  pri={x.name || x.title}
                  sec={sec}
                  ter={x.first_air_date || x.release_date}
                />
              </Link>
            )
          })}
        </CardGrid>
      )}

      {sp.tab === 'Crew' && (
        <CardGrid>
          {person?.combined_credits?.crew?.map((x) => {
            const sec = genShowText({
              pri: x.job,
              count: x.episode_count,
              rmVoice: true,
            })

            return (
              <Link
                href={`/${x.media_type}/${x.id}`}
                key={`${x.media_type} - ${x.id}`}
              >
                <Card
                  img={x.poster_path}
                  pri={x.name || x.title}
                  sec={sec}
                  ter={x.first_air_date || x.release_date}
                />
              </Link>
            )
          })}
        </CardGrid>
      )}

      {sp.tab === 'Images' && (
        <MediaGrid variant='234' images={person?.images?.profiles} />
      )}

      {showPager && (
        <Pager
          page={pageInt}
          pgUp={() => setPage(1)}
          pgDown={() => setPage(-1)}
        />
      )}
    </div>
  )
}
