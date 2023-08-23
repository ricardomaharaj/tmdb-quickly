import Link from 'next/link'
import { gql } from 'urql'
import { PosterCard } from '~/components/reusable/poster-card'
import { TVProps } from '~/types/props'
import { useTVQuery } from './query'

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

export default function Crew({ id, query, page }: TVProps) {
  const [res] = useTVQuery(gqlQuery, { id, query, page })
  const crew = res.data?.tv?.aggregate_credits?.crew

  return (
    <>
      <div className='grid123'>
        {crew?.map((x, i) => (
          <Link href={`/person/${x.id}`}>
            <PosterCard
              path={x.profile_path}
              pri={x.name}
              sec={x.jobs
                ?.slice(0, 2)
                .map((x) => `${x.job} (${x.episode_count})`)
                .join(' | ')}
              key={i}
            />
          </Link>
        ))}
      </div>
    </>
  )
}
