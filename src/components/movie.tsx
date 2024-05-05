import Link from 'next/link'
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
import { movieDoc } from '~/gql/movie'
import { useSp } from '~/hooks/search-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { toDateStr } from '~/util/date-str'
import { releaseType } from '~/util/release-type'
import { genRuntimeStr } from '~/util/runtime'
import { rmVoiceTag } from '~/util/voice'

const tabs = [
  { key: 'Info', val: 'Info' },
  { key: 'Cast', val: 'Cast' },
  { key: 'Crew', val: 'Crew' },
  { key: 'Images', val: 'Images' },
  { key: 'Videos', val: 'Videos' },
]

const imageTabs = [
  { key: 'Posters', val: 'Posters' },
  { key: 'Backdrops', val: 'Backdrops' },
]

export function MoviePage() {
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
    query: movieDoc,
    variables: {
      id: sp.id,
      query: sp.query,
      page: pageInt,
    },
  })

  const { fetching, error } = res
  const movie = res.data?.movie

  useTitle(movie?.title)

  const releaseDates = movie?.release_dates?.results?.map(
    (x) => x.release_dates,
  )[0]

  const showInputBar = ['Cast', 'Crew'].includes(sp.tab)
  const showPager = ['Cast', 'Crew', 'Images', 'Videos'].includes(sp.tab)

  if (error) return <ErrorMsg msg={error.message} />

  return (
    <div className='flex flex-col gap-2'>
      <BackdropCard
        bgImg={movie?.backdrop_path}
        to={`/movie/${sp.id}`}
        pri={movie?.title}
        sec={movie?.tagline}
        ter={movie?.release_date}
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
          <Div value={movie?.overview}>
            <Bubble>{movie?.overview}</Bubble>
          </Div>
          <Bubble>
            <Div value={movie?.status}>Status: {movie?.status}</Div>
            <Div value={movie?.runtime}>
              Runtime: {genRuntimeStr(movie?.runtime)}{' '}
            </Div>
            <Div value={movie?.budget}>
              Budget: ${movie?.budget?.toLocaleString()}
            </Div>
            <Div value={movie?.revenue}>
              Revenue: ${movie?.revenue?.toLocaleString()}
            </Div>
            <Div value={movie?.imdb_id} className='flex flex-row gap-1'>
              <Anchor
                href={`https://www.imdb.com/title/${movie?.imdb_id}/`}
                className='font-medium'
              >
                IMDB:
              </Anchor>
              <div>{movie?.imdb_id}</div>
            </Div>
            <Div value={movie?.id} className='flex flex-row gap-1'>
              <Anchor
                href={`https://www.themoviedb.org/movie/${movie?.id}`}
                className='font-medium'
              >
                TMDB:
              </Anchor>
              <div>{movie?.id}</div>
            </Div>
          </Bubble>
          <FlowRow>
            {movie?.genres?.map((x) => (
              <Tag key={x.name}>{x.name}</Tag>
            ))}
          </FlowRow>
          <FlowRow>
            {releaseDates?.map((x) => (
              <Tag className='text-sm' key={x.release_date}>
                <div>{releaseType[x.type!]}</div>
                <div>{toDateStr(x.release_date)}</div>
              </Tag>
            ))}
          </FlowRow>
          <FlowRow>
            {movie?.production_companies?.map((x) => (
              <Tag className='text-sm' key={x.name}>
                {x.name}
              </Tag>
            ))}
          </FlowRow>
        </>
      )}

      {sp.tab === 'Cast' && (
        <CardGrid>
          {movie?.credits?.cast?.map((x) => (
            <Link href={`/person/${x.id}`} key={x.id}>
              <Card
                img={x.profile_path}
                pri={x.name}
                sec={rmVoiceTag(x.character) ?? 'Unknown'}
              />
            </Link>
          ))}
        </CardGrid>
      )}

      {sp.tab === 'Crew' && (
        <CardGrid>
          {movie?.credits?.crew?.map((x) => (
            <Link href={`/person/${x.id}`} key={x.id}>
              <Card img={x.profile_path} pri={x.name} sec={x.job} />
            </Link>
          ))}
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
            <MediaGrid variant='234' images={movie?.images?.posters} />
          )}
          {sp.imageTab === 'Backdrops' && (
            <MediaGrid variant='123' images={movie?.images?.backdrops} />
          )}
        </>
      )}

      {sp.tab === 'Videos' && (
        <MediaGrid variant='234' videos={movie?.videos?.results} />
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
