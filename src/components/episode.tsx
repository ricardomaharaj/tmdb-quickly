import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'urql'
import { BackdropCard } from '~/components/ui/backdrop-card'
import { Bubble } from '~/components/ui/bubble'
import { Card } from '~/components/ui/card'
import { Div } from '~/components/ui/div'
import { ErrorMsg } from '~/components/ui/error-msg'
import { CardGrid, MediaGrid } from '~/components/ui/grid'
import { InputBar } from '~/components/ui/input-bar'
import { Loading } from '~/components/ui/loading'
import { Pager } from '~/components/ui/pager'
import { Taber } from '~/components/ui/taber'
import { episodeDoc } from '~/gql/episode'
import { useSp } from '~/hooks/search-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { genRuntimeStr } from '~/util/runtime'
import { genShowText } from '~/util/show-text'

const tabs = [
  { key: 'Info', val: 'Info' },
  { key: 'Guests', val: 'Guests' },
  { key: 'Crew', val: 'Crew' },
  { key: 'Images', val: 'Images' },
  { key: 'Videos', val: 'Videos' },
]

export function EpisodePage() {
  const router = useRouter()
  const params = router.query as Record<string, string | undefined>

  const [sp, rplSp] = useSp({
    query: '',
    page: '1',
    tab: 'Info',

    id: '',
    season_number: '',
    episode_number: '',
  })

  const pageInt = parseInt(sp.page)

  const setQuery = (query: string) => rplSp({ query, page: '1' })
  const setPage = (dir: number) => rplSp({ page: `${pageInt + dir}` })
  const setTab = (tab: string) => rplSp({ tab, page: '1' })

  const [db, setDb] = useState(sp.query)
  useTimeout(() => (db !== sp.query ? setQuery(db) : null), [db])

  const [res] = useQuery({
    query: episodeDoc,
    variables: {
      id: params.id!,
      season_number: params.season_number!,
      episode_number: params.episode_number!,
      query: sp.query,
      page: pageInt,
    },
  })

  const { data, fetching, error } = res
  const show = data?.tv
  const episode = data?.tvEpisode

  const showInputBar = ['Guests', 'Crew'].includes(sp.tab)
  const showPager = ['Guests', 'Crew', 'Images', 'Videos'].includes(sp.tab)

  const epTitle = (() => {
    let str = ''
    str += 'S' + `${episode?.season_number}`.padStart(2, '0')
    str += ' '
    str += 'E' + `${episode?.episode_number}`.padStart(2, '0')
    return str
  })()

  useTitle(show?.name ? `${show.name} ${epTitle}` : undefined)

  if (error) return <ErrorMsg msg={error.message} />

  return (
    <div className='flex flex-col gap-2'>
      <BackdropCard
        bgImg={episode?.still_path}
        to={`/tv/${params.id!}`}
        toText={show?.name}
        pri={episode?.name}
        sec={epTitle}
        ter={`${episode?.air_date} ${genRuntimeStr(episode?.runtime)}`}
      />

      <Taber tabs={tabs} activeTab={sp.tab} onTabClicked={setTab} />

      {showInputBar && (
        <InputBar defaultValue={sp.query} onValueChange={(val) => setDb(val)} />
      )}

      <Div value={fetching}>
        <Loading />
      </Div>

      {sp.tab === 'Info' && (
        <Div value={episode?.overview}>
          <Bubble>{episode?.overview}</Bubble>
        </Div>
      )}

      {sp.tab === 'Guests' && (
        <CardGrid>
          {episode?.guest_stars?.map((x) => {
            const sec = genShowText({
              pri: x?.character,
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
          {episode?.crew?.map((x) => {
            const sec = genShowText({ pri: x?.job })

            return (
              <Link href={`/person/${x.id}`} key={x.id}>
                <Card img={x.profile_path} pri={x.name} sec={sec} />
              </Link>
            )
          })}
        </CardGrid>
      )}

      {sp.tab === 'Images' && (
        <MediaGrid variant='234' images={episode?.images?.stills} />
      )}

      {sp.tab === 'Videos' && (
        <MediaGrid variant='234' videos={episode?.videos?.results} />
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
