import Link from 'next/link'
import { gql } from 'urql'
import { BackdropCard } from '~/components/reusable/backdrop-card'
import { usePath } from '~/hooks/path'
import { SeasonProps } from '~/types/props'
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
  const [res] = useSeasonQuery(gqlQuery, { id, season_number })
  const episodes = res.data?.season?.episodes

  const path = usePath()

  return (
    <>
      <div className='grid123'>
        {episodes?.map((episode, i) => (
          <Link href={`${path}/episode/${episode?.episode_number}`}>
            <BackdropCard
              backdrop={episode?.still_path}
              pri={episode?.name}
              sec={`S${season_number} E${episode?.episode_number} | ${episode?.air_date}`}
              ter={episode?.overview}
              className=''
              key={i}
            />
          </Link>
        ))}
      </div>
    </>
  )
}
