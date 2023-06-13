import { gql } from 'urql'
import { Card } from '~/comps/card'
import { removeVoiceTag } from '~/util/voice-tag'
import { useTVQuery } from './query'
import type { Props } from './z'

export default function Cast(props: Props) {
  const { id, query, page } = props.queries

  const [res] = useTVQuery({
    query: gql`
      query ($id: String!, $query: String, $page: Int) {
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
    `,
    variables: { id, query, page },
  })
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
                ?.map((x) => `${x.character} (${x.episode_count})`)
                ?.join(' | '),
            )}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
