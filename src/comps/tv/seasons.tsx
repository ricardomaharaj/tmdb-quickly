import { gql } from 'urql'
import { Card } from '~/comps/card'
import { useTVQuery } from './query'
import type { Props } from './z'

export default function Seasons(props: Props) {
  const { id } = props.queries

  const [res] = useTVQuery({
    query: gql`
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
    `,
    variables: { id },
  })
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
            tertiary={x.air_date}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
