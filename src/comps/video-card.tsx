import { toDateString } from '../util'

type Props = {
  video: {
    key?: string
    name?: string
    published_at?: string
  }
}

export function VideoCard(props: Props) {
  const { video } = props
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.key}`}
      target='_blank'
      rel='noopener noreferrer'
      className='link col p-0'
    >
      <img
        src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
        className='rounded-t-xl'
        loading='lazy'
        alt=''
      />
      <div className='col m-2'>
        <span>{video.name}</span>
        {video.published_at && (
          <span className='subtext'>{toDateString(video.published_at)}</span>
        )}
      </div>
    </a>
  )
}
