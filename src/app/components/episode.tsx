import { useRoute } from 'preact-iso'
import { useState } from 'preact/hooks'
import { useQuery } from 'urql'

import { episodeDoc } from '~/app/gql/episode'
import { useQueryParams } from '~/app/hooks/query-params'
import { useTimeout } from '~/app/hooks/timeout'
import { useTitle } from '~/app/hooks/title'
import { Data, Vars } from '~/app/types/query'
import { iconCodes } from '~/app/util/consts'
import { genRuntimeStr } from '~/app/util/runtime'
import { numGt0 } from '~/app/util/validation'
import { rmVoiceTag } from '~/app/util/voice'

import { BackdropCard } from './ui/backdrop-card'
import { Bio } from './ui/bio'
import { Bubble } from './ui/bubble'
import { Card } from './ui/card'
import { IconChip } from './ui/chip'
import { ErrorMsg } from './ui/error-msg'
import { FlowRow } from './ui/flow-row'
import { Frag } from './ui/frag'
import { ImageLink } from './ui/image-link'
import { InputBar } from './ui/input-bar'
import { Loading } from './ui/loading'
import { Pager } from './ui/pager'
import { VideoCard } from './ui/video-card'

export function EpisodePage() {
  const route = useRoute()
  const [params, setParams] = useQueryParams({
    query: '',
    page: '1',
  })

  const { id, season_number, episode_number } = route.params

  const pageInt = parseInt(params.page)

  const setQuery = (query: string) => setParams({ query, page: '1' })
  const setPage = (dir: number) => setParams({ page: `${pageInt + dir}` })

  const [db, setDb] = useState(params.query)
  useTimeout(() => (db !== params.query ? setQuery(db) : null), [db])

  const [res] = useQuery<Data, Vars>({
    query: episodeDoc,
    variables: {
      id: id,
      season_number: season_number,
      episode_number: episode_number,
      query: params.query,
      page: pageInt,
    },
  })

  const { fetching, error } = res
  const show = res.data?.tv
  const episode = res.data?.tvEpisode

  function genEpisodeStr() {
    let str = ''
    str += 'S' + `${season_number}`.padStart(2, '0')
    str += ' '
    str += 'E' + `${episode_number}`.padStart(2, '0')

    return str
  }

  function genTitle() {
    const content: string[] = []

    if (show?.name) content.push(show.name)
    if (episode?.name) content.push(episode.name)

    content.push(genEpisodeStr())

    return content.join(' | ')
  }

  function genSecText() {
    const content: string[] = []

    if (episode?.name) content.push(episode.name)
    content.push(genEpisodeStr())

    return content.join(' | ')
  }

  function genTerText() {
    const content: string[] = []

    if (episode?.air_date) content.push(episode.air_date)
    if (numGt0(episode?.runtime)) {
      content.push(genRuntimeStr(episode!.runtime!)!)
    }

    return content.join(' | ')
  }

  useTitle(genTitle())

  if (fetching && !res.data) return <Loading />
  if (error) return <ErrorMsg msg={error.message} />

  return (
    <div className='flex flex-col gap-2'>
      <BackdropCard
        bgImg={episode?.still_path}
        href={`/tv/${id}`}
        pri={show?.name}
        sec={genSecText()}
        ter={genTerText()}
      />

      <Frag value={episode?.overview}>
        <Bubble>
          <Bio bio={episode?.overview} />
        </Bubble>
      </Frag>

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

      <Frag value={episode?.guest_stars?.length}>
        <IconChip icon={iconCodes.people} label='Guests' />
        <FlowRow>
          {episode?.guest_stars?.map((x) => (
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

      <Frag value={episode?.crew?.length}>
        <IconChip icon={iconCodes.peopleAlt} label='Crew' />
        <FlowRow>
          {episode?.crew?.map((x) => (
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

      <Frag value={episode?.images?.stills?.length}>
        <IconChip icon={iconCodes.image} label='Stills' />
        <FlowRow>
          {episode?.images?.stills?.map((x) => (
            <ImageLink x={x} variant='landscape' key={x.file_path} />
          ))}
        </FlowRow>
      </Frag>

      <Frag value={episode?.videos?.results?.length}>
        <IconChip icon={iconCodes.video} label='Videos' />
        <FlowRow>
          {episode?.videos?.results?.map((x) => <VideoCard x={x} key={x.id} />)}
        </FlowRow>
      </Frag>
    </div>
  )
}
