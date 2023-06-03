import { gql, useQuery } from 'urql'
import { Card } from '~/comps/card'
import { ID } from '~/types/id'
import { Movie } from '~/types/tmdb'
import { removeVoiceTag } from '~/util/voice-tag'
import { Queries } from './types'

const query = gql`
  query ($id: ID!, $query: String, $page: Int) {
    movie(id: $id, query: $query, page: $page) {
      credits {
        cast {
          id
          name
          character
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
function useCastQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

type Props = { queries: Queries }
export default function Cast(props: Props) {
  const { queries } = props
  const { id, query, page } = queries

  const [res] = useCastQuery({ id, query, page })
  const cast = res.data?.movie?.credits?.cast

  return (
    <div className='col mb-2 space-y-2'>
      {cast?.map((x, i) => (
        <Card
          href={`/person/${x.id}`}
          image={x.profile_path}
          primary={x.name}
          secondary={removeVoiceTag(x.character)}
          key={i}
        />
      ))}
    </div>
  )
}
