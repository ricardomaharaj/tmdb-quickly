import { gql, useQuery } from 'urql'
import { Card } from '~/comps/card'
import { ID } from '~/types/id'
import { TV } from '~/types/tmdb'

const query = gql`
  query ($id: ID!) {
    tv(id: $id) {
      seasons {
        name
        air_date
        episode_count
        overview
        poster_path
        season_number
      }
    }
  }
`

type Data = { tv?: TV }
type Vars = { id: ID }
function useSeasonsQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

type Props = { id: ID }
export default function Seasons(props: Props) {
  const { id } = props
  const [res] = useSeasonsQuery({ id })
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
