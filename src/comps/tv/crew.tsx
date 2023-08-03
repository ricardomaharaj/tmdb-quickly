import { gql } from 'urql'
import { Card } from '~/comps/card'
import { useTVQuery } from './query'
import { TVProps } from './z'

const gqlQuery = gql`
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
`

export default function Crew(props: TVProps) {
  const { queries } = props
  const { id, query, page } = queries

  const [res] = useTVQuery(gqlQuery, { id, query, page })
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
