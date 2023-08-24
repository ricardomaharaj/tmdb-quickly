import Link from 'next/link'
import { gql } from 'urql'
import { usePersonQuery } from '~/components/person/query'
import { PosterCard } from '~/components/reusable/poster-card'
import { PersonProps } from '~/types/props'
import { dateStr } from '~/util/date-str'

const gqlQuery = gql`
  query ($id: String!, $query: String, $page: Int, $filter: String) {
    person(id: $id, query: $query, page: $page, filter: $filter) {
      combined_credits {
        crew {
          id
          name
          title
          job
          poster_path
          release_date
          first_air_date
          media_type
          episode_count
        }
      }
    }
  }
`

export default function Crew(props: PersonProps) {
  const [res] = usePersonQuery(gqlQuery, props)
  const cast = res.data?.person?.combined_credits?.crew

  return (
    <>
      <div className='grid123'>
        {cast?.map((x, i) => (
          <Link href={`/${x.media_type}/${x.id}`}>
            <PosterCard
              path={x.poster_path}
              pri={x.name || x.title}
              sec={`${x.job} (${x.episode_count})`}
              ter={dateStr(x.release_date || x.first_air_date)}
              key={i}
            />
          </Link>
        ))}
      </div>
    </>
  )
}
