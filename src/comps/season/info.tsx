import { gql } from 'urql'
import { useSeasonQuery } from './query'
import { SeasonProps } from './z'

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!) {
    season(id: $id, season_number: $season_number) {
      overview
    }
  }
`

export default function Info(props: SeasonProps) {
  const { queries } = props
  const { id, season_number } = queries

  const [res] = useSeasonQuery(gqlQuery, { id, season_number })
  const season = res.data?.season

  return (
    <>
      <div className='border-2 p-4'>
        <p>{season?.overview || 'No overview for this season'}</p>
      </div>
    </>
  )
}
