import { gql } from 'urql'
import { LinkCard } from '~/components/reusable/link-card'
import { SeasonProps } from '~/types/props'
import { useSeasonQuery } from './query'

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!, $query: String, $page: Int) {
    season(id: $id, season_number: $season_number, query: $query, page: $page) {
      credits {
        cast {
          character
          id
          name
          profile_path
        }
      }
    }
  }
`

export default function Cast({ id, season_number, query, page }: SeasonProps) {
  const [res] = useSeasonQuery(gqlQuery, { id, season_number, query, page })
  const cast = res.data?.season?.credits?.cast

  return (
    <>
      <div className='grid123'>
        {cast?.map((x, i) => (
          <LinkCard
            href={`/person/${x.id}`}
            path={x.profile_path}
            pri={x.name}
            sec={x.character}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
