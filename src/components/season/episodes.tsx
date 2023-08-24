import Link from 'next/link'
import { gql } from 'urql'
import { BackdropCard } from '~/components/reusable/backdrop-card'
import { usePath } from '~/hooks/path'
import { SeasonProps } from '~/types/props'
import { dateStr } from '~/util/date-str'
import { genRuntimeStr } from '~/util/runtime-str'
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
        {episodes?.map((x, i) => (
          <Link href={`${path}/episode/${x?.episode_number}`} key={i}>
            <BackdropCard
              backdrop={x?.still_path}
              pri={x?.name}
              sec={`S${season_number} E${x?.episode_number} | ${dateStr(
                x?.air_date,
              )} | ${genRuntimeStr(x.runtime)}`}
              ter={x?.overview}
              className=''
            />
          </Link>
        ))}
      </div>
    </>
  )
}
