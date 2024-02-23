import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'urql'
import { BackdropCard } from '~/components/ui/backdrop-card'
import { Btn } from '~/components/ui/btn'
import { Bubble } from '~/components/ui/bubble'
import { Card } from '~/components/ui/card'
import { ErrorMsg } from '~/components/ui/error-msg'
import { FlowRow } from '~/components/ui/flow-row'
import { Grid } from '~/components/ui/grid'
import { Img } from '~/components/ui/img'
import { InputBar } from '~/components/ui/input-bar'
import { Pager } from '~/components/ui/pager'
import { VidCard } from '~/components/ui/vid-card'
import { episodeDoc } from '~/gql/episode'
import { useSp } from '~/hooks/search-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { imgUrls } from '~/util/img'
import { genRuntimeStr } from '~/util/runtime'
import { rmVoiceTag } from '~/util/voice'

const tabs = ['Info', 'Guests', 'Crew', 'Images', 'Videos']

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

  const pgUp = () => rplSp({ page: `${pageInt + 1}` })
  const pgDown = () => rplSp({ page: `${pageInt - 1}` })

  const [db, setDb] = useState(sp.query)
  useTimeout(() => rplSp({ query: db, page: '1' }), [db])

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

  const { data, error } = res
  const show = data?.tv
  const episode = data?.tvEpisode

  const showInputBar = ['Guests', 'Crew'].includes(sp.tab)
  const showPager = ['Guests', 'Crew', 'Images', 'Videos'].includes(sp.tab)

  function genTitleStr() {
    let str = ''
    str += 'S' + `${episode?.season_number}`.padStart(2, '0')
    str += ' '
    str += 'E' + `${episode?.episode_number}`.padStart(2, '0')
    return str
  }

  useTitle(show?.name ? `${show.name} ${genTitleStr()}` : undefined)

  if (error) return <ErrorMsg msg={error.message} />

  return (
    <>
      <div className='flex flex-col gap-2'>
        <BackdropCard
          bgImg={episode?.still_path}
          to={`/tv/${params.id!}`}
          toText={show?.name}
          pri={episode?.name}
          sec={genTitleStr()}
          ter={`${episode?.air_date} ${genRuntimeStr(episode?.runtime)}`}
        />
        <FlowRow>
          {tabs.map((tab) => (
            <Btn
              withHover
              isActive={sp.tab === tab}
              onClick={() => rplSp({ tab: tab, page: '1' })}
              key={tab}
            >
              {tab}
            </Btn>
          ))}
        </FlowRow>
        {sp.tab === 'Info' && (
          <>
            <Bubble>{episode?.overview}</Bubble>
          </>
        )}
        {showInputBar && (
          <InputBar
            defaultValue={sp.query}
            onValueChange={(val) => setDb(val)}
            className='pl-3'
          />
        )}
        {sp.tab === 'Guests' && (
          <Grid variant='123'>
            {episode?.guest_stars?.map((x) => (
              <Link href={`/person/${x.id}`} key={x.id}>
                <Card
                  img={x.profile_path}
                  pri={x.name}
                  ter={rmVoiceTag(x.character)}
                />
              </Link>
            ))}
          </Grid>
        )}
        {sp.tab === 'Crew' && (
          <Grid variant='123'>
            {episode?.crew?.map((x) => (
              <Link href={`/person/${x.id}`} key={x.id}>
                <Card img={x.profile_path} pri={x.name} ter={x.job} />
              </Link>
            ))}
          </Grid>
        )}
        {sp.tab === 'Images' && (
          <Grid variant='234'>
            {episode?.images?.stills?.map((x) => (
              <a
                href={`${imgUrls.original}${x.file_path}`}
                target='_blank'
                rel='noreferrer'
                key={x.file_path}
              >
                <Img src={`${imgUrls.w500}${x.file_path}`} />
              </a>
            ))}
          </Grid>
        )}
        {sp.tab === 'Videos' && (
          <Grid variant='234'>
            {episode?.videos?.results?.map((x) => (
              <VidCard vid={x} key={x.key} />
            ))}
          </Grid>
        )}
        {showPager && <Pager page={pageInt} pgUp={pgUp} pgDown={pgDown} />}
      </div>
    </>
  )
}
