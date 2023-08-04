import { gql } from 'urql'
import { Card } from '~/comps/card'
import { useSeasonQuery } from './query'
import { SeasonProps } from './z'

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!, $query: String, $page: Int) {
    season(id: $id, season_number: $season_number, query: $query, page: $page) {
      credits {
        crew {
          job
          id
          name
          profile_path
        }
      }
    }
  }
`

export default function Crew(props: SeasonProps) {
  const { queries } = props
  const { id, season_number, query, page } = queries

  const [res] = useSeasonQuery(gqlQuery, { id, season_number, query, page })
  const crew = res.data?.season?.credits?.crew

  return (
    <>
      <div className='col mb-2 space-y-2'>
        {crew?.map((x, i) => (
          <Card
            href={`/person/${x.id}`}
            image={x.profile_path}
            primary={x.name}
            secondary={x.job}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
