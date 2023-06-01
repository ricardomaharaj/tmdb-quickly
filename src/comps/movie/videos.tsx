import { gql, useQuery } from 'urql'
import { VideoCard } from '~/comps/video-card'
import { ID } from '~/types/id'
import { Movie } from '~/types/tmdb'
import { Queries } from './types'

const query = gql`
  query ($id: ID!, $page: Int) {
    movie(id: $id, page: $page) {
      videos {
        results {
          key
          name
          published_at
          type
        }
      }
    }
  }
`

type Data = { movie?: Movie }
type Vars = { id: ID; page: number }
function useVideosQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

type Props = { queries: Queries }
export default function Videos(props: Props) {
  const { queries } = props
  const { id, page } = queries

  const [res] = useVideosQuery({ id, page })
  const videos = res.data?.movie?.videos?.results

  return (
    <>
      <div className='grid234 mb-2'>
        {videos?.map((x, i) => (
          <VideoCard
            href={`https://www.youtube.com/watch?v=${x.key}`}
            src={`https://i.ytimg.com/vi/${x.key}/hq720.jpg`}
            primary={x.name}
            secondary={x.published_at ? new Date(x.published_at) : undefined}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
