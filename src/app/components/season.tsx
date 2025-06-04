import { useRoute } from 'preact-iso'
import { useState } from 'preact/hooks'
import { useQuery } from 'urql'

import { seasonDoc } from '~/app/gql/season'
import { useQueryParams } from '~/app/hooks/query-params'
import { useTimeout } from '~/app/hooks/timeout'
import { useTitle } from '~/app/hooks/title'
import { Data, Vars } from '~/app/types/query'
import { iconCodes } from '~/app/util/consts'
import { numGt0 } from '~/app/util/validation'
import { rmVoiceTag } from '~/app/util/voice'

import { BackdropCard } from './ui/backdrop-card'
import { Bubble } from './ui/bubble'
import { Card } from './ui/card'
import { IconChip } from './ui/chip'
import { EpisodeCard } from './ui/episode-card'
import { ErrorMsg } from './ui/error-msg'
import { FlowRow } from './ui/flow-row'
import { Frag } from './ui/frag'
import { ImageLink } from './ui/image-link'
import { InputBar } from './ui/input-bar'
import { Loading } from './ui/loading'
import { Pager } from './ui/pager'
import { VideoCard } from './ui/video-card'

export function SeasonPage() {
  const route = useRoute()
  const [params, setParams] = useQueryParams({
    query: '',
    page: '1',
  })

  const { id, season_number } = route.params

  const pageInt = parseInt(params.page)

  const setQuery = (query: string) => setParams({ query, page: '1' })
  const setPage = (dir: number) => setParams({ page: `${pageInt + dir}` })

  const [db, setDb] = useState(params.query)
  useTimeout(() => (db !== params.query ? setQuery(db) : null), [db])

  const [res] = useQuery<Data, Vars>({
    query: seasonDoc,
    variables: {
      id: id,
      season_number: season_number,
      query: params.query,
      page: pageInt,
    },
  })

  const { fetching, error } = res
  const show = res.data?.tv
  const season = res.data?.tvSeason

  function genSeasonStr() {
    let str = ''
    str += 'S'
    str += `${season_number}`.padStart(2, '0')
    return str
  }

  function genTitle() {
    const content: string[] = []

    if (show?.name) content.push(show.name)
    content.push(genSeasonStr())

    return content.join(' | ')
  }

  function genPriText() {
    const content: string[] = []

    if (show?.name) content.push(show.name)
    if (season_number) content.push(`Season ${season_number}`)

    return content.join(' | ')
  }

  function genTerText() {
    const content: string[] = []

    if (season?.air_date) content.push(season.air_date)
    if (numGt0(season?.episodes?.length)) {
      content.push(`${season?.episodes?.length} Episodes`)
    }

    return content.join(' | ')
  }

  useTitle(genTitle())

  if (fetching && !res.data) return <Loading />
  if (error) return <ErrorMsg msg={error.message} />

  return (
    <div className='flex flex-col gap-2'>
      <BackdropCard
        bgImg={show?.backdrop_path}
        href={`/tv/${id}`}
        pri={genPriText()}
        sec={genTerText()}
      />

      <Frag value={season?.overview}>
        <Bubble>{season?.overview}</Bubble>
      </Frag>

      <IconChip icon={iconCodes.tv} label='Episodes' />
      <FlowRow>
        {season?.episodes?.map((x) => (
          <EpisodeCard
            href={`/tv/${id}/season/${season_number}/episode/${x.episode_number}`}
            key={x.id}
            x={x}
          />
        ))}
      </FlowRow>

      <div className='flex flex-row gap-2'>
        <InputBar
          defaultValue={params.query}
          onValueChange={(val) => setDb(val)}
        />
        <Pager
          page={pageInt}
          pgUp={() => setPage(+1)}
          pgDown={() => setPage(-1)}
          loading={fetching}
        />
      </div>

      <Frag value={season?.credits?.cast?.length}>
        <IconChip icon={iconCodes.people} label='Cast' />
        <FlowRow>
          {season?.credits?.cast?.map((x) => (
            <Card
              href={`/person/${x.id}`}
              key={x.id}
              img={x.profile_path}
              pri={x.name}
              sec={rmVoiceTag(x.character) || 'Unknown'}
            />
          ))}
        </FlowRow>
      </Frag>

      <Frag value={season?.credits?.crew?.length}>
        <IconChip icon={iconCodes.peopleAlt} label='Crew' />
        <FlowRow>
          {season?.credits?.crew?.map((x) => (
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

      <Frag value={season?.images?.posters?.length}>
        <IconChip icon={iconCodes.image} label='Images' />
        <FlowRow>
          {season?.images?.posters?.map((x) => (
            <ImageLink x={x} variant='portrait' key={x.file_path} />
          ))}
        </FlowRow>
      </Frag>

      <Frag value={season?.videos?.results?.length}>
        <IconChip icon={iconCodes.video} label='Videos' />
        <FlowRow>
          {season?.videos?.results?.map((x) => <VideoCard x={x} key={x.id} />)}
        </FlowRow>
      </Frag>
    </div>
  )
}
