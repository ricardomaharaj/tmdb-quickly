import { useRouter } from 'next/router'
import { gql } from 'urql'
import { BackdropCard } from '~/components/reusable/backdrop-card'
import { usePath } from '~/hooks/path'
import { paramParse } from '~/util/param-parse'
import { getSearchParams } from '~/util/search-params'
import { useEpisodeQuery } from './query'

const tabs = ['Info', 'Cast', 'Crew', 'Stills', 'Videos']

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!, $episode_number: Int!) {
    tv(id: $id) {
      name
    }
    episode(
      episode_number: $episode_number
      id: $id
      season_number: $season_number
    ) {
      name
      air_date
      still_path
    }
  }
`

export function EpisodePage() {
  const router = useRouter()

  const searchParams = getSearchParams(router.query)
  const params = paramParse(searchParams)

  const id = params.id || ''
  const season_number = parseInt(params.season_number || '1')
  const episode_number = parseInt(params.episode_number || '1')

  const query = params.query || ''
  const page = parseInt(params.page || '1')
  const tab = params.tab || 'Info'

  const [res] = useEpisodeQuery(gqlQuery, { id, season_number, episode_number })
  const tv = res.data?.tv
  const episode = res.data?.episode

  const path = usePath()

  return (
    <>
      <div className='m-2'>
        <BackdropCard
          backdrop={episode?.still_path}
          pri={tv?.name}
          sec={episode?.name}
          ter={episode?.air_date}
        />
      </div>
    </>
  )
}
