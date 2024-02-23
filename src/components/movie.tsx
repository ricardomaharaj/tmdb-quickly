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
import { movieDoc } from '~/gql/movie'
import { useSp } from '~/hooks/search-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { toDateStr } from '~/util/date-str'
import { imgUrls } from '~/util/img'
import { releaseType } from '~/util/release-type'
import { genRuntimeStr } from '~/util/runtime'
import { numGt0 } from '~/util/validation'
import { rmVoiceTag } from '~/util/voice'

const tabs = ['Info', 'Cast', 'Crew', 'Images', 'Videos']
const imageTabs = ['Posters', 'Backdrops']

export function MoviePage() {
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
    query: movieDoc,
    variables: {
      id: params.id!,
      query: sp.query,
      page: pageInt,
    },
  })

  const { data, error } = res
  const movie = data?.movie

  useTitle(movie?.title)

  const releaseDates = movie?.release_dates?.results?.map(
    (x) => x.release_dates,
  )[0]

  const showInputBar = ['Cast', 'Crew'].includes(sp.tab)
  const showPager = ['Cast', 'Crew', 'Images', 'Videos'].includes(sp.tab)

  if (error) return <ErrorMsg msg={error.message} />

  return (
    <>
      <div className='flex flex-col gap-2'>
        <BackdropCard
          bgImg={movie?.backdrop_path}
          img={movie?.poster_path}
          pri={movie?.title}
          sec={movie?.tagline}
          ter={movie?.release_date}
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
            <Bubble>{movie?.overview}</Bubble>
            <Bubble>
              {movie?.status && <div>Status: {movie?.status}</div>}
              {numGt0(movie?.runtime) && (
                <div>Runtime: {genRuntimeStr(movie?.runtime)}</div>
              )}
              {numGt0(movie?.budget) && (
                <div>Budget: ${movie?.budget?.toLocaleString()}</div>
              )}
              {numGt0(movie?.revenue) && (
                <div>Revenue: ${movie?.revenue?.toLocaleString()}</div>
              )}
              {movie?.imdb_id && (
                <div className='flex flex-row gap-1'>
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                    target='_blank'
                    rel='noreferrer'
                    className='font-medium'
                  >
                    IMDB:
                  </a>
                  <div>{movie.imdb_id}</div>
                </div>
              )}
            </Bubble>
            <FlowRow>
              {movie?.genres?.map((x, i) => <Tag key={i}>{x.name}</Tag>)}
            </FlowRow>
            <FlowRow>
              {releaseDates?.map((x, i) => (
                <Tag className='text-sm' key={i}>
                  <div>{releaseType[x.type!]}</div>
                  <div>{toDateStr(x.release_date)}</div>
                </Tag>
              ))}
            </FlowRow>
            <FlowRow>
              {movie?.production_companies?.map((x, i) => (
                <Tag className='text-sm' key={i}>
                  {x.name}
                </Tag>
              ))}
            </FlowRow>
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
            {movie?.credits?.cast?.map((x) => (
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
            {movie?.credits?.crew?.map((x) => (
              <Link href={`/person/${x.id}`} key={x.id}>
                <Card img={x.profile_path} pri={x.name} ter={x.job} />
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
                {movie?.images?.posters?.map((x) => (
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
                {movie?.images?.backdrops?.map((x) => (
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
            {movie?.videos?.results?.map((x) => (
              <VidCard vid={x} key={x.key} />
            ))}
          </Grid>
        )}
        {showPager && <Pager page={pageInt} pgUp={pgUp} pgDown={pgDown} />}
      </div>
    </>
  )
}
