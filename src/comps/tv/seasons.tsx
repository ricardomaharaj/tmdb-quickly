import { gql } from 'urql'
import { Card } from '~/comps/card'
import { useTVQuery } from '~/comps/tv/query'
import { TVProps } from '~/comps/tv/z'
import { toDateString } from '~/util/local-date'

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

export default function Seasons(props: TVProps) {
  const { queries } = props
  const { id } = queries

  const [res] = useTVQuery(gqlQuery, { id })
  const seasons = res.data?.tv?.seasons

  return (
    <>
      <div className='col space-y-2'>
        {seasons?.map((x, i) => (
          <Card
            href={`/tv/${id}/season/${x.season_number}`}
            image={x.poster_path}
            primary={x.name}
            secondary={`${x.episode_count} Episodes`}
            tertiary={toDateString(x.air_date)}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
