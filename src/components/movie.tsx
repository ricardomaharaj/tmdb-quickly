import { useRoute } from 'preact-iso'
import { useState } from 'preact/hooks'
import { useQuery } from 'urql'
import { Anchor } from '~/components/ui/anchor'
import { BackdropCard } from '~/components/ui/backdrop-card'
import { Bio } from '~/components/ui/bio'
import { Bubble } from '~/components/ui/bubble'
import { Card } from '~/components/ui/card'
import { IconChip } from '~/components/ui/chip'
import { Div } from '~/components/ui/div'
import { ErrorMsg } from '~/components/ui/error-msg'
import { FlowRow } from '~/components/ui/flow-row'
import { Frag } from '~/components/ui/frag'
import { ImageLink } from '~/components/ui/image-link'
import { InputBar } from '~/components/ui/input-bar'
import { Loading } from '~/components/ui/loading'
import { Pager } from '~/components/ui/pager'
import { Tag } from '~/components/ui/tag'
import { VideoCard } from '~/components/ui/video-card'
import { movieDoc } from '~/gql/movie'
import { useQueryParams } from '~/hooks/query-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { Data, Vars } from '~/types/query'
import { icon } from '~/util/consts'
import { toDateStr } from '~/util/date-str'
import { releaseType } from '~/util/release-type'
import { genRuntimeStr } from '~/util/runtime'
import { rmVoiceTag } from '~/util/voice'

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
        to={`/movie/${id}`}
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
        <IconChip icon={icon.people} label='Cast' />
        <FlowRow>
          {movie?.credits?.cast?.map((x) => (
            <a href={`/person/${x.id}`} key={x.id}>
              <Card
                img={x.profile_path}
                pri={x.name}
                sec={rmVoiceTag(x.character) ?? 'Unknown'}
              />
            </a>
          ))}
        </FlowRow>
      </Frag>

      <Frag value={movie?.credits?.crew?.length}>
        <IconChip icon={icon.peopleAlt} label='Crew' />
        <FlowRow>
          {movie?.credits?.crew?.map((x) => (
            <a href={`/person/${x.id}`} key={x.id}>
              <Card img={x.profile_path} pri={x.name} sec={x.job} />
            </a>
          ))}
        </FlowRow>
      </Frag>

      <Frag
        value={
          movie?.images?.posters?.length || movie?.images?.backdrops?.length
        }
      >
        <IconChip icon={icon.image} label='Images' />
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
        <IconChip icon={icon.video} label='Videos' />
        <FlowRow>
          {movie?.videos?.results?.map((x) => <VideoCard x={x} key={x.id} />)}
        </FlowRow>
      </Frag>

      <IconChip icon={icon.text} label='More Info' />
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
            className='font-bold underline'
          >
            IMDB:
          </Anchor>
          <div>{movie?.imdb_id}</div>
        </Div>
        <Div value={movie?.id} className='flex flex-row gap-1'>
          <Anchor
            href={`https://www.themoviedb.org/movie/${movie?.id}`}
            className='font-bold underline'
          >
            TMDB:
          </Anchor>
          <div>{movie?.id}</div>
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
