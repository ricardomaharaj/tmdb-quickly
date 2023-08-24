import Link from 'next/link'
import { gql } from 'urql'
import { usePersonQuery } from '~/components/person/query'
import { PosterCard } from '~/components/reusable/poster-card'
import { PersonProps } from '~/types/props'
import { dateStr } from '~/util/date-str'
import { removeVoiceTag } from '~/util/voice-tag'

const gqlQuery = gql`
  query ($id: String!, $query: String, $page: Int, $filter: String) {
    person(id: $id, query: $query, page: $page, filter: $filter) {
      combined_credits {
        cast {
          id
          name
          title
          character
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

export default function Cast(props: PersonProps) {
  const [res] = usePersonQuery(gqlQuery, props)
  const cast = res.data?.person?.combined_credits?.cast

  return (
    <>
      <div className='grid123'>
        {cast?.map((x, i) => {
          let sec = removeVoiceTag(x.character)
          if (x.media_type === 'tv' && x.episode_count! > 0)
            sec += ` (${x.episode_count})`

          return (
            <Link href={`/${x.media_type}/${x.id}`} key={i}>
              <PosterCard
                path={x.poster_path}
                pri={x.name || x.title}
                sec={sec}
                ter={dateStr(x.release_date || x.first_air_date)}
              />
            </Link>
          )
        })}
      </div>
    </>
  )
}
