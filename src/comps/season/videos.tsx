import { gql } from 'urql'
import { VideoCard } from '~/comps/video-card'
import { toDateStr } from '~/util/to-date-str'
import { useSeasonQuery } from './query'
import { SeasonProps } from './z'

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
            secondary={toDateStr(x.published_at)}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
