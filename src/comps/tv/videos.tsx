import { gql } from 'urql'
import { VideoCard } from '~/comps/video-card'
import { useTVQuery } from './query'
import type { Queries } from './z'

type Props = { queries: Queries }
export default function Videos(props: Props) {
  const { id, page } = props.queries

  const [res] = useTVQuery({
    query: gql`
      query ($id: String!, $page: Int) {
        tv(id: $id, page: $page) {
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
  const videos = res.data?.tv?.videos?.results

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
