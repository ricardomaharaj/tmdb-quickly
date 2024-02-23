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
import { Tag } from '~/components/ui/tag'
import { VidCard } from '~/components/ui/vid-card'
import { showDoc } from '~/gql/show'
import { useSp } from '~/hooks/search-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { imgUrls } from '~/util/img'
import { genRuntimeStr } from '~/util/runtime'
import { numGt0 } from '~/util/validation'
import { rmVoiceTag } from '~/util/voice'

const tabs = ['Info', 'Seasons', 'Cast', 'Crew', 'Images', 'Videos']
const imageTabs = ['Posters', 'Backdrops']

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

  const pgUp = () => rplSp({ page: `${pageInt + 1}` })
  const pgDown = () => rplSp({ page: `${pageInt - 1}` })

  const [db, setDb] = useState(sp.query)
  useTimeout(() => rplSp({ query: db, page: '1' }), [db])

  const [res] = useQuery({
    query: showDoc,
    variables: {
      id: params.id!,
      query: sp.query,
      page: pageInt,
    },
  })

  const { data, error } = res
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
    <>
      <>
        <div className='flex flex-col gap-2'>
          <BackdropCard
            bgImg={show?.backdrop_path}
            img={show?.poster_path}
            pri={show?.name}
            sec={show?.tagline}
            ter={show?.first_air_date}
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
              <Bubble>{show?.overview}</Bubble>
              <Bubble>
                {show?.status && <div>Status: {show?.status}</div>}
                {show?.type && <div>Show Type: {show?.type}</div>}
                {numGt0(show?.episode_run_time?.at(0)) && (
                  <div>
                    Runtime: {genRuntimeStr(show?.episode_run_time?.at(0))}{' '}
                  </div>
                )}
                {numGt0(show?.number_of_seasons) && (
                  <div>Seasons: {show?.number_of_seasons}</div>
                )}
                {numGt0(show?.number_of_episodes) && (
                  <div>Episodes: {show?.number_of_episodes}</div>
                )}
                {show?.first_air_date && (
                  <div>First Aired: {show.first_air_date}</div>
                )}
                {show?.last_air_date && (
                  <div>Last Aired: {show.last_air_date}</div>
                )}
                {show?.external_ids?.imdb_id && (
                  <div className='flex flex-row gap-1'>
                    <a
                      href={`https://www.imdb.com/title/${show?.external_ids?.imdb_id}/`}
                      target='_blank'
                      rel='noreferrer'
                      className='font-medium'
                    >
                      IMDB:
                    </a>
                    <div>{show?.external_ids?.imdb_id}</div>
                  </div>
                )}
              </Bubble>
              <FlowRow>
                {show?.genres?.map((x) => <Tag key={x.name}>{x.name}</Tag>)}
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
            <>
              <Grid variant='123'>
                {show?.seasons?.map((x) => (
                  <Link
                    href={`/tv/${params.id}/season/${x.season_number}`}
                    key={x.id}
                  >
                    <Card
                      img={x.poster_path}
                      pri={x.name}
                      sec={
                        numGt0(x.episode_count)
                          ? `${x.episode_count} Episodes`
                          : undefined
                      }
                      ter={x.air_date}
                    />
                  </Link>
                ))}
              </Grid>
            </>
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
              {show?.aggregate_credits?.cast?.map((x) => (
                <Link href={`/person/${x.id}`} key={x.id}>
                  <Card
                    img={x.profile_path}
                    pri={x.name}
                    ter={x.roles
                      ?.slice(0, 3)
                      ?.map(
                        (x) =>
                          `${rmVoiceTag(x.character) ?? 'Unknown'} ${
                            numGt0(x.episode_count)
                              ? `(${x.episode_count} Eps)`
                              : ''
                          }`,
                      )
                      ?.join(' | ')}
                  />
                </Link>
              ))}
            </Grid>
          )}
          {sp.tab === 'Crew' && (
            <Grid variant='123'>
              {show?.aggregate_credits?.crew?.map((x) => (
                <Link href={`/person/${x.id}`} key={x.id}>
                  <Card
                    img={x.profile_path}
                    pri={x.name}
                    ter={x.jobs
                      ?.slice(0, 3)
                      ?.map(
                        (x) =>
                          `${x.job} ${
                            numGt0(x.episode_count)
                              ? `(${x.episode_count} Eps)`
                              : ''
                          }`,
                      )
                      ?.join(' | ')}
                  />
                </Link>
              ))}
            </Grid>
          )}
          {sp.tab === 'Images' && (
            <>
              <FlowRow>
                {imageTabs.map((tab) => (
                  <Btn
                    withHover
                    isActive={sp.imageTab === tab}
                    onClick={() => rplSp({ imageTab: tab })}
                    key={tab}
                  >
                    {tab}
                  </Btn>
                ))}
              </FlowRow>
              {sp.imageTab === 'Posters' && (
                <Grid variant='234'>
                  {show?.images?.posters?.map((x) => (
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
              {sp.imageTab === 'Backdrops' && (
                <Grid variant='123'>
                  {show?.images?.backdrops?.map((x) => (
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
            </>
          )}
          {sp.tab === 'Videos' && (
            <Grid variant='234'>
              {show?.videos?.results?.map((x) => (
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
