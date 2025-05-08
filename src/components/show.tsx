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
import { showDoc } from '~/gql/show'
import { useQueryParams } from '~/hooks/query-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { Data, Vars } from '~/types/query'
import { icon } from '~/util/consts'
import { genMediaStr } from '~/util/media-str'
import { genRuntimeStr } from '~/util/runtime'
import { numGt0 } from '~/util/validation'

export function ShowPage() {
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
    query: showDoc,
    variables: {
      id: id,
      query: params.query,
      page: pageInt,
    },
  })

  const { fetching, error } = res
  const show = res.data?.tv

  function genTerTxt() {
    const data: string[] = []

    if (show?.first_air_date) {
      data.push(show.first_air_date)
      if (show?.last_air_date) {
        data.push(show.last_air_date)
      }
    }

    return data.join(' - ')
  }

  useTitle(show?.name)

  function genCompanies() {
    const tmp: string[] = []
    show?.networks?.map((x) => {
      if (x.name) tmp.push(x.name)
    })
    show?.production_companies?.map((x) => {
      if (x.name) tmp.push(x.name)
    })
    return tmp
  }

  const companies = genCompanies()

  if (fetching && !res.data) return <Loading />
  if (error) return <ErrorMsg msg={error.message} />

  return (
    <div className='flex flex-col gap-2'>
      <BackdropCard
        bgImg={show?.backdrop_path}
        to={`/tv/${id}`}
        pri={show?.name}
        sec={genTerTxt()}
      />

      <Frag value={show?.overview}>
        <Bubble>
          <Bio bio={show?.overview} />
        </Bubble>
      </Frag>

      <IconChip icon={icon.tv} label='Seasons' />
      <FlowRow>
        {show?.seasons?.map((x) => {
          let sec = ''
          if (numGt0(x.episode_count)) sec += `${x.episode_count} Episodes`

          return (
            <a href={`/tv/${id}/season/${x.season_number}`} key={x.id}>
              <Card
                img={x.poster_path}
                pri={x.name}
                sec={sec}
                ter={x.air_date}
              />
            </a>
          )
        })}
      </FlowRow>

      <div className='flex flex-row gap-2'>
        <InputBar defaultValue={params.query} onValueChange={setDebounce} />
        <Pager
          page={pageInt}
          pgUp={() => setPage(+1)}
          pgDown={() => setPage(-1)}
          loading={fetching}
        />
      </div>

      <Frag value={show?.aggregate_credits?.cast?.length}>
        <IconChip icon={icon.people} label='Cast' />
        <FlowRow>
          {show?.aggregate_credits?.cast?.map((x) => {
            const role = x.roles?.at(0)
            const sec = genMediaStr({
              pri: role?.character,
              count: role?.episode_count,
              rmVoice: true,
            })

            return (
              <a href={`/person/${x.id}`} key={x.id}>
                <Card img={x.profile_path} pri={x.name} sec={sec} />
              </a>
            )
          })}
        </FlowRow>
      </Frag>

      <Frag value={show?.aggregate_credits?.crew?.length}>
        <IconChip icon={icon.peopleAlt} label='Crew' />
        <FlowRow>
          {show?.aggregate_credits?.crew?.map((x) => {
            const role = x.jobs?.at(0)
            const sec = genMediaStr({
              pri: role?.job,
              count: role?.episode_count,
              rmVoice: true,
            })

            return (
              <a href={`/person/${x.id}`} key={x.id}>
                <Card img={x.profile_path} pri={x.name} sec={sec} />
              </a>
            )
          })}
        </FlowRow>
      </Frag>

      <Frag
        value={show?.images?.posters?.length || show?.images?.backdrops?.length}
      >
        <IconChip icon={icon.image} label='Images' />
        <FlowRow>
          {show?.images?.posters?.map((x) => (
            <ImageLink x={x} variant='portrait' key={x.file_path} />
          ))}
        </FlowRow>
        <FlowRow>
          {show?.images?.backdrops?.map((x) => (
            <ImageLink x={x} variant='landscape' key={x.file_path} />
          ))}
        </FlowRow>
      </Frag>

      <Frag value={show?.videos?.results?.length}>
        <IconChip icon={icon.video} label='Videos' />
        <FlowRow>
          {show?.videos?.results?.map((x) => <VideoCard x={x} key={x.id} />)}
        </FlowRow>
      </Frag>

      <IconChip icon={icon.text} label='More Info' />
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
        <Div value={show?.last_air_date}>Last Aired: {show?.last_air_date}</Div>
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
        {show?.genres?.map((x) => <Tag key={x.name}>{x.name}</Tag>)}
      </FlowRow>
      <FlowRow>
        {companies?.map((x) => (
          <Tag className='text-sm' key={x}>
            {x}
          </Tag>
        ))}
      </FlowRow>
    </div>
  )
}
