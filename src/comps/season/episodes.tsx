import Image from 'next/image'
import Link from 'next/link'
import { gql } from 'urql'
import { usePath } from '~/hooks/path'
import { SeasonProps } from '~/types/props'
import { genEpTitleStr } from '~/util/ep-title-str'
import { imageUrls } from '~/util/image-urls'
import { useSeasonQuery } from './query'

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

export default function Episodes({ id, season_number }: SeasonProps) {
  const curPath = usePath()

  const [res] = useSeasonQuery(gqlQuery, { id, season_number })
  const episodes = res.data?.season?.episodes

  return (
    <>
      <div className='col mb-2 space-y-2'>
        {episodes?.map((x, i) => (
          <Link
            href={`${curPath}/episode/${x.episode_number}`}
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
            <div className='mb-1'>{genEpTitleStr(x, season_number)}</div>
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
