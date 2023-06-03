import { gql, useQuery } from 'urql'
import { Card } from '~/comps/card'
import { ID } from '~/types/id'
import { TV } from '~/types/tmdb'
import { removeVoiceTag } from '~/util/voice-tag'
import { Queries } from './types'

const query = gql`
  query ($id: ID!, $query: String, $page: Int) {
    tv(id: $id, query: $query, page: $page) {
      aggregate_credits {
        cast {
          id
          name
          profile_path
          roles {
            character
            episode_count
          }
        }
      }
    }
  }
`

type Data = { tv?: TV }
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
  const cast = res.data?.tv?.aggregate_credits?.cast

  return (
    <>
      <div className='col mb-2 space-y-2'>
        {cast?.map((x, i) => (
          <Card
            href={`/person/${x.id}`}
            image={x.profile_path}
            primary={x.name}
            secondary={removeVoiceTag(
              x.roles
                ?.slice(0, 2)
                .map((x) => `${x.character} (${x.episode_count})`)
                .join(' | '),
            )}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
