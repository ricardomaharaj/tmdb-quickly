import { gql } from 'urql'
import { VideoCard } from '~/components/reusable/video-card'
import { MovieProps } from '~/types/props'
import { useMovieQuery } from './query'

const gqlQuery = gql`
  query ($id: String!, $page: Int) {
    movie(id: $id, page: $page) {
      videos {
        results {
          key
          name
          published_at
        }
      }
    }
  }
`

export default function Videos({ id, page }: MovieProps) {
  const [res] = useMovieQuery(gqlQuery, { id, page })
  const videos = res.data?.movie?.videos?.results

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
