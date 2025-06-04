import { useRoute } from 'preact-iso'
import { useState } from 'preact/hooks'
import { useQuery } from 'urql'

import { movieDoc } from '~/app/gql/movie'
import { useQueryParams } from '~/app/hooks/query-params'
import { useTimeout } from '~/app/hooks/timeout'
import { useTitle } from '~/app/hooks/title'
import { Data, Vars } from '~/app/types/query'
import { iconCodes } from '~/app/util/consts'
import { toDateStr } from '~/app/util/date-str'
import { releaseType } from '~/app/util/release-type'
import { genRuntimeStr } from '~/app/util/runtime'
import { rmVoiceTag } from '~/app/util/voice'

import { Anchor } from './ui/anchor'
import { BackdropCard } from './ui/backdrop-card'
import { Bio } from './ui/bio'
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
import { Tag } from './ui/tag'
import { VideoCard } from './ui/video-card'

export function MoviePage() {
  const route = useRoute()
  const [params, setParams] = useQueryParams({
    query: '',
    page: '1',
  })

  const id = route.params.id

  const pageInt = parseInt(params.page)

  const setQuery = (query: string) => setParams({ query, page: '1' })
  const setPage = (dir: number) => setParams({ page: `${pageInt + dir}` })

  const [debounce, setDebounce] = useState(params.query)
  useTimeout(
    () => (debounce !== params.query ? setQuery(debounce) : null),
    [debounce],
  )

  const [res] = useQuery<Data, Vars>({
    query: movieDoc,
    variables: {
      id: id,
      query: params.query,
      page: pageInt,
    },
  })

  const { fetching, error } = res
  const movie = res.data?.movie

  useTitle(movie?.title)

  const releaseDates = movie?.release_dates?.results?.map(
    (x) => x.release_dates,
  )[0]

  if (fetching && !res.data) return <Loading />
  if (error) return <ErrorMsg msg={error.message} />

  return (
    <div className='flex flex-col gap-2'>
      <BackdropCard
        bgImg={movie?.backdrop_path}
        pri={movie?.title}
        sec={movie?.release_date}
      />

      <Frag value={movie?.overview}>
        <Bubble>
          <Bio bio={movie?.overview} />
        </Bubble>
      </Frag>

      <div className='flex flex-row gap-2'>
        <InputBar defaultValue={params.query} onValueChange={setDebounce} />
        <Pager
          page={pageInt}
          pgUp={() => setPage(+1)}
          pgDown={() => setPage(-1)}
          loading={fetching}
        />
      </div>

      <Frag value={movie?.credits?.cast?.length}>
        <IconChip icon={iconCodes.people} label='Cast' />
        <FlowRow>
          {movie?.credits?.cast?.map((x) => (
            <Card
              href={`/person/${x.id}`}
              key={x.id}
              img={x.profile_path}
              pri={x.name}
              sec={rmVoiceTag(x.character) ?? 'Unknown'}
            />
          ))}
        </FlowRow>
      </Frag>

      <Frag value={movie?.credits?.crew?.length}>
        <IconChip icon={iconCodes.peopleAlt} label='Crew' />
        <FlowRow>
          {movie?.credits?.crew?.map((x) => (
            <Card
              href={`/person/${x.id}`}
              key={x.id}
              img={x.profile_path}
              pri={x.name}
              sec={x.job || 'Unknown'}
            />
          ))}
        </FlowRow>
      </Frag>

      <Frag
        value={
          movie?.images?.posters?.length || movie?.images?.backdrops?.length
        }
      >
        <IconChip icon={iconCodes.image} label='Images' />
        <FlowRow>
          {movie?.images?.posters?.map((x) => (
            <ImageLink x={x} variant='portrait' key={x.file_path} />
          ))}
        </FlowRow>
        <FlowRow>
          {movie?.images?.backdrops?.map((x) => (
            <ImageLink x={x} variant='landscape' key={x.file_path} />
          ))}
        </FlowRow>
      </Frag>

      <Frag value={movie?.videos?.results?.length}>
        <IconChip icon={iconCodes.video} label='Videos' />
        <FlowRow>
          {movie?.videos?.results?.map((x) => <VideoCard x={x} key={x.id} />)}
        </FlowRow>
      </Frag>

      <IconChip icon={iconCodes.text} label='More Info' />
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
        <Div value={movie?.imdb_id} className='flex flex-row'>
          <Anchor
            href={`https://www.imdb.com/title/${movie?.imdb_id}/`}
            className='font-bold'
          >
            IMDB
          </Anchor>
          <div>: {movie?.imdb_id}</div>
        </Div>
        <Div value={movie?.id} className='flex flex-row'>
          <Anchor
            href={`https://www.themoviedb.org/movie/${movie?.id}`}
            className='font-bold'
          >
            TMDB
          </Anchor>
          <div>: {movie?.id}</div>
        </Div>
      </Bubble>
      <FlowRow>
        {movie?.genres?.map((x) => <Tag key={x.name}>{x.name}</Tag>)}
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
    </div>
  )
}
