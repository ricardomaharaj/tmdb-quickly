import Image from 'next/image'
import Link from 'next/link'
import { gql } from 'urql'
import { usePath } from '~/hooks/path'
import { SeasonEpisode } from '~/types/tmdb'
import { imageUrls } from '~/util/image-urls'
import { genRuntime } from '~/util/runtime'
import { toDateStr } from '~/util/to-date-str'
import { useSeasonQuery } from './query'
import { SeasonProps } from './z'

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!) {
    season(id: $id, season_number: $season_number) {
      episodes {
        air_date
        episode_number
        name
        overview
        runtime
        still_path
      }
    }
  }
`

export default function Episodes(props: SeasonProps) {
  const { queries } = props
  const { id, season_number } = queries

  const path = usePath()

  const [res] = useSeasonQuery(gqlQuery, { id, season_number })
  const episodes = res.data?.season?.episodes

  function genTitle(ep: SeasonEpisode) {
    let tag = 'S'
    tag += `${season_number}`.padStart(2, '0') + 'E'
    if (ep.episode_number) {
      tag += `${ep.episode_number}`.padStart(2, '0')
    }

    if (ep.air_date) {
      tag += ` | ${toDateStr(ep.air_date)}`
    }

    if (ep.runtime) {
      tag += ` | ${genRuntime(ep.runtime)}`
    }

    return tag
  }

  return (
    <>
      <div className='col mb-2 space-y-2'>
        {episodes?.map((x, i) => (
          <Link
            href={`${path}/episode/${x.episode_number}`}
            className='border-2 p-2'
            key={i}
          >
            {x.still_path && (
              <Image
                src={`${imageUrls.w320h180}${x.still_path}`}
                width={320}
                height={180}
                className='mx-auto mb-2'
                alt=''
              />
            )}
            <div className='mb-1'>{genTitle(x)}</div>
            <div>
              <p className='line-clamp-3'>
                {x.overview || 'No overview for this episode'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
