import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'urql'
import { Anchor } from '~/components/ui/anchor'
import { BackdropCard } from '~/components/ui/backdrop-card'
import { Bubble } from '~/components/ui/bubble'
import { Card } from '~/components/ui/card'
import { Div } from '~/components/ui/div'
import { ErrorMsg } from '~/components/ui/error-msg'
import { FlowRow } from '~/components/ui/flow-row'
import { CardGrid, MediaGrid } from '~/components/ui/grid'
import { InputBar } from '~/components/ui/input-bar'
import { Loading } from '~/components/ui/loading'
import { Pager } from '~/components/ui/pager'
import { Taber } from '~/components/ui/taber'
import { Tag } from '~/components/ui/tag'
import { showDoc } from '~/gql/show'
import { useSp } from '~/hooks/search-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { genRuntimeStr } from '~/util/runtime'
import { genShowText } from '~/util/show-text'
import { numGt0 } from '~/util/validation'

const tabs = [
  { key: 'Info', val: 'Info' },
  { key: 'Seasons', val: 'Seasons' },
  { key: 'Cast', val: 'Cast' },
  { key: 'Crew', val: 'Crew' },
  { key: 'Images', val: 'Images' },
  { key: 'Videos', val: 'Videos' },
]

const imageTabs = [
  { key: 'Posters', val: 'Posters' },
  { key: 'Backdrops', val: 'Backdrops' },
]

export function ShowPage() {
  const router = useRouter()
  const params = router.query as Record<string, string | undefined>

  const [sp, rplSp] = useSp({
    query: '',
    page: '1',
    tab: 'Info',
    imageTab: 'Posters',

    id: '',
  })

  const pageInt = parseInt(sp.page)

  const setQuery = (query: string) => rplSp({ query, page: '1' })
  const setPage = (dir: number) => rplSp({ page: `${pageInt + dir}` })
  const setTab = (tab: string) => rplSp({ tab, page: '1' })
  const setImageTab = (imageTab: string) => rplSp({ imageTab, page: '1' })

  const [db, setDb] = useState(sp.query)
  useTimeout(() => (db !== sp.query ? setQuery(db) : null), [db])

  const [res] = useQuery({
    query: showDoc,
    variables: {
      id: params.id!,
      query: sp.query,
      page: pageInt,
    },
  })

  const { data, fetching, error } = res
  const show = data?.tv

  useTitle(show?.name)

  const companies = (() => {
    const tmp: string[] = []
    show?.networks?.map((x) => {
      if (x.name) tmp.push(x.name)
    })
    show?.production_companies?.map((x) => {
      if (x.name) tmp.push(x.name)
    })
    return tmp
  })()

  const showInputBar = ['Cast', 'Crew'].includes(sp.tab)
  const showPager = ['Cast', 'Crew', 'Images', 'Videos'].includes(sp.tab)

  if (error) return <ErrorMsg msg={error.message} />

  return (
    <div className='flex flex-col gap-2'>
      <BackdropCard
        bgImg={show?.backdrop_path}
        to={`/tv/${params.id!}`}
        toText={show?.name}
        sec={show?.tagline}
        ter={show?.first_air_date}
      />

      <Taber tabs={tabs} activeTab={sp.tab} onTabClicked={setTab} />

      {showInputBar && (
        <InputBar defaultValue={sp.query} onValueChange={(val) => setDb(val)} />
      )}

      <Div value={fetching}>
        <Loading />
      </Div>

      {sp.tab === 'Info' && (
        <>
          <Div value={show?.overview}>
            <Bubble>{show?.overview}</Bubble>
          </Div>
          <Bubble>
            <Div value={show?.status}>Status: {show?.status}</Div>
            <Div value={show?.type}>Show Type: {show?.type}</Div>
            <Div value={show?.episode_run_time?.at(0)}>
              Runtime: {genRuntimeStr(show?.episode_run_time?.at(0))}{' '}
            </Div>
            <Div value={show?.number_of_seasons}>
              Seasons: {show?.number_of_seasons}
            </Div>
            <Div value={show?.number_of_episodes}>
              Episodes: {show?.number_of_episodes}
            </Div>
            <Div value={show?.first_air_date}>
              First Aired: {show?.first_air_date}
            </Div>
            <Div value={show?.last_air_date}>
              Last Aired: {show?.last_air_date}
            </Div>
            <Div
              value={show?.external_ids?.imdb_id}
              className='flex flex-row gap-1'
            >
              <Anchor
                href={`https://www.imdb.com/title/${show?.external_ids?.imdb_id}/`}
                className='font-medium'
              >
                IMDB:
              </Anchor>
              <div>{show?.external_ids?.imdb_id}</div>
            </Div>
            <Div value={show?.id} className='flex flex-row gap-1'>
              <Anchor
                href={`https://www.themoviedb.org/tv/${show?.id}`}
                className='font-medium'
              >
                TMDB:
              </Anchor>
              <div>{show?.id}</div>
            </Div>
          </Bubble>
          <FlowRow>
            {show?.genres?.map((x) => (
              <Tag key={x.name}>{x.name}</Tag>
            ))}
          </FlowRow>
          <FlowRow>
            {companies?.map((x) => (
              <Tag className='text-sm' key={x}>
                {x}
              </Tag>
            ))}
          </FlowRow>
        </>
      )}

      {sp.tab === 'Seasons' && (
        <CardGrid>
          {show?.seasons?.map((x) => {
            let sec = ''
            if (numGt0(x.episode_count)) sec += `${x.episode_count} Episodes`

            return (
              <Link
                href={`/tv/${params.id}/season/${x.season_number}`}
                key={x.id}
              >
                <Card
                  img={x.poster_path}
                  pri={x.name}
                  sec={sec}
                  ter={x.air_date}
                />
              </Link>
            )
          })}
        </CardGrid>
      )}

      {sp.tab === 'Cast' && (
        <CardGrid>
          {show?.aggregate_credits?.cast?.map((x) => {
            const role = x.roles?.at(0)
            const sec = genShowText({
              pri: role?.character,
              count: role?.episode_count,
              rmVoice: true,
            })

            return (
              <Link href={`/person/${x.id}`} key={x.id}>
                <Card img={x.profile_path} pri={x.name} sec={sec} />
              </Link>
            )
          })}
        </CardGrid>
      )}

      {sp.tab === 'Crew' && (
        <CardGrid>
          {show?.aggregate_credits?.crew?.map((x) => {
            const role = x.jobs?.at(0)
            const sec = genShowText({
              pri: role?.job,
              count: role?.episode_count,
              rmVoice: true,
            })

            return (
              <Link href={`/person/${x.id}`} key={x.id}>
                <Card img={x.profile_path} pri={x.name} sec={sec} />
              </Link>
            )
          })}
        </CardGrid>
      )}

      {sp.tab === 'Images' && (
        <>
          <Taber
            tabs={imageTabs}
            activeTab={sp.imageTab}
            onTabClicked={setImageTab}
          />
          {sp.imageTab === 'Posters' && (
            <MediaGrid variant='234' images={show?.images?.posters} />
          )}
          {sp.imageTab === 'Backdrops' && (
            <MediaGrid variant='123' images={show?.images?.backdrops} />
          )}
        </>
      )}

      {sp.tab === 'Videos' && (
        <MediaGrid variant='234' videos={show?.videos?.results} />
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
