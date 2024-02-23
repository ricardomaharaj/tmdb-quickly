import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'urql'
import { Btn } from '~/components/ui/btn'
import { Card } from '~/components/ui/card'
import { ErrorMsg } from '~/components/ui/error-msg'
import { FlowRow } from '~/components/ui/flow-row'
import { Grid } from '~/components/ui/grid'
import { Img } from '~/components/ui/img'
import { InputBar } from '~/components/ui/input-bar'
import { Pager } from '~/components/ui/pager'
import { VidCard } from '~/components/ui/vid-card'
import { seasonDoc } from '~/gql/season'
import { useSp } from '~/hooks/search-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { imgUrls } from '~/util/img'
import { genRuntimeStr } from '~/util/runtime'
import { rmVoiceTag } from '~/util/voice'

const tabs = ['Episodes', 'Cast', 'Crew', 'Images', 'Videos']

export function SeasonPage() {
  const router = useRouter()
  const params = router.query as Record<string, string | undefined>

  const [sp, rplSp] = useSp({
    query: '',
    page: '1',
    tab: 'Episodes',

    id: '',
    season_number: '',
  })

  const pageInt = parseInt(sp.page)

  const pgUp = () => rplSp({ page: `${pageInt + 1}` })
  const pgDown = () => rplSp({ page: `${pageInt - 1}` })

  const [db, setDb] = useState(sp.query)
  useTimeout(() => rplSp({ query: db, page: '1' }), [db])

  const [res] = useQuery({
    query: seasonDoc,
    variables: {
      id: params.id!,
      season_number: params.season_number!,
      query: sp.query,
      page: pageInt,
    },
  })

  const { data, error } = res
  const show = data?.tv
  const season = data?.tvSeason

  useTitle(
    show?.name
      ? `${show.name} S${params.season_number!.padStart(2, '0')}`
      : undefined,
  )

  const showInputBar = ['Cast', 'Crew'].includes(sp.tab)
  const showPager = ['Cast', 'Crew', 'Images', 'Videos'].includes(sp.tab)

  if (error) return <ErrorMsg msg={error.message} />

  return (
    <>
      <>
        <div className='flex flex-col gap-2'>
          <Card
            noHover
            img={season?.poster_path}
            to={`/tv/${params.id!}`}
            pri={show?.name}
            sec={season?.name}
            ter={season?.air_date}
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
          {sp.tab === 'Episodes' && (
            <Grid variant='234'>
              {season?.episodes?.map((x) => (
                <Link
                  href={`/tv/${params.id}/season/${params.season_number}/episode/${x.episode_number}`}
                  key={x.id}
                >
                  <div className='flex flex-col rounded-xl bg-slate-800 transition-colors hover:bg-slate-700'>
                    <Img
                      src={`${imgUrls.w320h180}${x.still_path}`}
                      className='rounded-t-xl'
                    />
                    <div className='flex flex-col gap-1 p-2'>
                      <div className='line-clamp-1 font-medium'>
                        {x.episode_number} | {x.name}
                      </div>
                      <div className='line-clamp-2'>{x.overview}</div>
                      <div className='line-clamp-1 text-sm text-slate-400'>
                        {x.air_date} | {genRuntimeStr(x.runtime)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Grid>
          )}
          {showInputBar && (
            <InputBar
              defaultValue={sp.query}
              onValueChange={(val) => setDb(val)}
              className='pl-3'
            />
          )}
          {sp.tab === 'Cast' && (
            <Grid variant='123'>
              {season?.credits?.cast?.map((x) => (
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
              {season?.credits?.crew?.map((x) => (
                <Link href={`/person/${x.id}`} key={x.id}>
                  <Card img={x.profile_path} pri={x.name} ter={x.job} />
                </Link>
              ))}
            </Grid>
          )}
          {sp.tab === 'Images' && (
            <Grid variant='234'>
              {season?.images?.posters?.map((x) => (
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
              {season?.videos?.results?.map((x) => (
                <VidCard vid={x} key={x.key} />
              ))}
            </Grid>
          )}
          {showPager && <Pager page={pageInt} pgUp={pgUp} pgDown={pgDown} />}
        </div>
      </>
    </>
  )
}
