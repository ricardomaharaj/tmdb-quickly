import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql } from 'urql'
import { usePath } from '~/hooks/path'
import { imageUrls } from '~/util/image-urls'
import { paramParse } from '~/util/param-parse'
import { getSearchParams } from '~/util/search-params'
import { useEpisodeQuery } from './query'

const tabs = ['Info', 'Cast', 'Crew', 'Stills', 'Videos']

const gqlQuery = gql`
  query (
    $id: String = ""
    $season_number: Int = 10
    $episode_number: Int = 10
  ) {
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
        <div
          className='rounded-xl border-2 bg-cover bg-center text-white shadow-xl'
          style={{
            backgroundImage: `url('${imageUrls.w500}/${episode?.still_path}')`,
          }}
        >
          <div className='col space-y-2 rounded-xl bg-black bg-opacity-50 p-4'>
            <Link href={`/tv/${id}`} className='font-bold underline'>
              {tv?.name}
            </Link>
            <div>{`S${season_number} E${episode_number}`}</div>
            <div>{episode?.name}</div>
            <div>{episode?.air_date}</div>
          </div>
        </div>
      </div>
    </>
  )
}
