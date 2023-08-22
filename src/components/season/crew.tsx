import { gql } from 'urql'
import { LinkCard } from '~/components/reusable/link-card'
import { SeasonProps } from '~/types/props'
import { useSeasonQuery } from './query'

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

export default function Crew({ id, season_number, query, page }: SeasonProps) {
  const [res] = useSeasonQuery(gqlQuery, { id, season_number, query, page })
  const crew = res.data?.season?.credits?.crew

  return (
    <>
      <div className='col mb-2 space-y-2'>
        {crew?.map((x, i) => (
          <LinkCard
            href={`/person/${x.id}`}
            path={x.profile_path}
            pri={x.name}
            sec={x.job}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
