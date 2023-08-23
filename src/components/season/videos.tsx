import { gql } from 'urql'
import { VideoCard } from '~/components/reusable/video-card'
import { SeasonProps } from '~/types/props'
import { useSeasonQuery } from './query'

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

export default function Videos({ id, season_number, page }: SeasonProps) {
  const [res] = useSeasonQuery(gqlQuery, { id, season_number, page })
  const videos = res.data?.season?.videos?.results

  return (
    <>
      <div className='grid234'>
        {videos?.map((x, i) => (
          <VideoCard ytKey={x.key} pri={x.name} sec={x.published_at} key={i} />
        ))}
      </div>
    </>
  )
}
