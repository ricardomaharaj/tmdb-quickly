import { useRoute } from 'preact-iso'
import { useState } from 'preact/hooks'
import { useQuery } from 'urql'
import { BackdropCard } from '~/components/ui/backdrop-card'
import { Bubble } from '~/components/ui/bubble'
import { Card } from '~/components/ui/card'
import { IconChip } from '~/components/ui/chip'
import { EpisodeCard } from '~/components/ui/episode-card'
import { ErrorMsg } from '~/components/ui/error-msg'
import { FlowRow } from '~/components/ui/flow-row'
import { Frag } from '~/components/ui/frag'
import { ImageLink } from '~/components/ui/image-link'
import { InputBar } from '~/components/ui/input-bar'
import { Loading } from '~/components/ui/loading'
import { Pager } from '~/components/ui/pager'
import { VideoCard } from '~/components/ui/video-card'
import { seasonDoc } from '~/gql/season'
import { useQueryParams } from '~/hooks/query-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { Data, Vars } from '~/types/query'
import { icon } from '~/util/consts'
import { genMediaStr } from '~/util/media-str'
import { numGt0 } from '~/util/validation'

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

  function genSeasonShortHand() {
    let str = ''
    str += 'S'
    str += `${season_number}`.padStart(2, '0')
    return str
  }

  function genTitle() {
    const content: string[] = []

    if (show?.name) content.push(show.name)
    content.push(genSeasonShortHand())

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
        to={`/tv/${id}`}
        pri={genPriText()}
        sec={genTerText()}
      />

      <Frag value={season?.overview}>
        <Bubble>{season?.overview}</Bubble>
      </Frag>

      <IconChip icon={icon.tv} label='Episodes' />
      <FlowRow>
        {season?.episodes?.map((x) => (
          <a
            href={`/tv/${id}/season/${season_number}/episode/${x.episode_number}`}
            key={x.id}
          >
            <EpisodeCard x={x} />
          </a>
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
        <IconChip icon={icon.people} label='Cast' />
        <FlowRow>
          {season?.credits?.cast?.map((x) => {
            const sec = genMediaStr({
              pri: x?.character,
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

      <Frag value={season?.credits?.crew?.length}>
        <IconChip icon={icon.peopleAlt} label='Crew' />
        <FlowRow>
          {season?.credits?.crew?.map((x) => {
            const sec = genMediaStr({ pri: x?.job })

            return (
              <a href={`/person/${x.id}`} key={x.id}>
                <Card img={x.profile_path} pri={x.name} sec={sec} />
              </a>
            )
          })}
        </FlowRow>
      </Frag>

      <Frag value={season?.images?.posters?.length}>
        <IconChip icon={icon.image} label='Images' />
        <FlowRow>
          {season?.images?.posters?.map((x) => (
            <ImageLink x={x} variant='portrait' key={x.file_path} />
          ))}
        </FlowRow>
      </Frag>

      <Frag value={season?.videos?.results?.length}>
        <IconChip icon={icon.video} label='Videos' />
        <FlowRow>
          {season?.videos?.results?.map((x) => <VideoCard x={x} key={x.id} />)}
        </FlowRow>
      </Frag>
    </div>
  )
}
