import { gql, useQuery } from 'urql'
import { Card } from '~/comps/card'
import { ID } from '~/types/id'
import { Movie } from '~/types/tmdb'
import { Queries } from './types'

const query = gql`
  query ($id: ID!, $query: String, $page: Int) {
    movie(id: $id, query: $query, page: $page) {
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

type Data = { movie: Movie }
type Vars = {
  id: ID
  query: string
  page: number
}
function useCrewQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

type Props = { queries: Queries }
export default function Crew(props: Props) {
  const { queries } = props
  const { id, query, page } = queries

  const [res] = useCrewQuery({ id, query, page })
  const crew = res.data?.movie?.credits?.crew

  return (
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
  )
}
