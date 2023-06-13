import { gql } from 'urql'
import { Card } from '~/comps/card'
import { useTVQuery } from './query'
import type { Props } from './z'

export default function Crew(props: Props) {
  const { id, query, page } = props.queries

  const [res] = useTVQuery({
    query: gql`
      query ($id: String!, $query: String, $page: Int) {
        tv(id: $id, query: $query, page: $page) {
          aggregate_credits {
            crew {
              id
              name
              profile_path
              jobs {
                episode_count
                job
              }
            }
          }
        }
      }
    `,
    variables: { id, query, page },
  })
  const crew = res.data?.tv?.aggregate_credits?.crew

  return (
    <>
      <div className='col mb-2 space-y-2'>
        {crew?.map((x, i) => (
          <Card
            image={x.profile_path}
            href={`/person/${x.id}`}
            primary={x.name}
            secondary={x.jobs
              ?.slice(0, 2)
              ?.map((x) => `${x.job} (${x.episode_count})`)
              ?.join(' | ')}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
