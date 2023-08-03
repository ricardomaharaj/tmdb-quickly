import { gql } from 'urql'
import { VideoCard } from '~/comps/video-card'
import { useMovieQuery } from './query'
import { MovieProps } from './z'

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

export default function Videos(props: MovieProps) {
  const { queries } = props
  const { id, page } = queries

  const [res] = useMovieQuery(gqlQuery, { id, page })
  const videos = res.data?.movie?.videos?.results

  return (
    <>
      <div className='grid234 mb-2'>
        {videos?.map((vid, i) => (
          <VideoCard
            href={`https://www.youtube.com/watch?v=${vid.key}`}
            src={`https://i.ytimg.com/vi/${vid.key}/hqdefault.jpg`}
            primary={vid.name}
            secondary={
              vid.published_at ? new Date(vid.published_at) : undefined
            }
            key={i}
          />
        ))}
      </div>
    </>
  )
}
