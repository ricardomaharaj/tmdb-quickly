import { gql } from 'urql'
import { VideoCard } from '~/comps/video-card'
import { useMovieQuery } from './query'
import { Props } from './z'

export default function Videos(props: Props) {
  const { queries } = props
  const { id, page } = queries

  const [res] = useMovieQuery({
    query: gql`
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
    `,
    variables: { id, page },
  })
  const videos = res.data?.movie?.videos?.results

  return (
    <>
      <div className='grid234 mb-2'>
        {videos?.map((x, i) => (
          <VideoCard
            href={`https://www.youtube.com/watch?v=${x.key}`}
            src={`https://i.ytimg.com/vi/${x.key}/hqdefault.jpg`}
            primary={x.name}
            secondary={x.published_at ? new Date(x.published_at) : undefined}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
