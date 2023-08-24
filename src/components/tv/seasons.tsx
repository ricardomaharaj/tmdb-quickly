import Link from 'next/link'
import { gql } from 'urql'
import { BackdropCard } from '~/components/reusable/backdrop-card'
import { usePath } from '~/hooks/path'
import { TVProps } from '~/types/props'
import { dateStr } from '~/util/date-str'
import { useTVQuery } from './query'

const gqlQuery = gql`
  query ($id: String!) {
    tv(id: $id) {
      seasons {
        air_date
        episode_count
        name
        overview
        poster_path
        season_number
      }
    }
  }
`

export default function Seasons({ id }: TVProps) {
  const [res] = useTVQuery(gqlQuery, { id })
  const seasons = res.data?.tv?.seasons

  const path = usePath()

  return (
    <>
      <div className='grid123'>
        {seasons?.map((x, i) => (
          <Link href={`${path}/season/${x.season_number}`} key={i}>
            <BackdropCard
              backdrop={x.poster_path}
              pri={x.name}
              sec={`${x.episode_count} Episodes`}
              ter={dateStr(x.air_date)}
            />
          </Link>
        ))}
      </div>
    </>
  )
}
