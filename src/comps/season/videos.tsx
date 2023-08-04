import { gql } from 'urql'
import { useSeasonQuery } from '~/comps/season/query'
import { SeasonProps } from '~/comps/season/z'
import { VideoCard } from '~/comps/video-card'
import { toDateString } from '~/util/local-date'

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!, $page: Int) {
    season(id: $id, season_number: $season_number, page: $page) {
      videos {
        results {
          key
          name
          type
          published_at
        }
      }
    }
  }
`

export default function Videos(props: SeasonProps) {
  const { queries } = props
  const { id, season_number, page } = queries

  const [res] = useSeasonQuery(gqlQuery, { id, season_number, page })
  const videos = res.data?.season?.videos?.results

  return (
    <>
      <div className='grid234 mb-2'>
        {videos?.map((x, i) => (
          <VideoCard
            href={`https://www.youtube.com/watch?v=${x.key}`}
            src={`https://i.ytimg.com/vi/${x.key}/hqdefault.jpg`}
            primary={x.name}
            secondary={toDateString(x.published_at)}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
