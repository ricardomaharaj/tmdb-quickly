import { gql } from 'urql'
import { SeasonProps } from '~/types/props'
import { useSeasonQuery } from './query'

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!) {
    season(id: $id, season_number: $season_number) {
      overview
    }
  }
`

export default function Info({ id, season_number }: SeasonProps) {
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
