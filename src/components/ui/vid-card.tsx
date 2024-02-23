import { Img } from '~/components/ui/img'
import { VideoResult } from '~/types/tmdb'
import { toDateStr } from '~/util/date-str'

export function VidCard({ vid }: { vid: VideoResult }) {
  return (
    <a
      href={`https://m.youtube.com/watch?v=${vid.key}`}
      target='_blank'
      rel='noreferrer'
      className='flex flex-col rounded-xl bg-slate-800 transition-colors hover:bg-slate-700'
    >
      <Img
        src={`https://i.ytimg.com/vi/${vid.key}/hq720.jpg`}
        className='aspect-video rounded-t-xl'
      />

      <div className='flex flex-col p-2'>
        {vid.name && (
          <div className='line-clamp-2 text-sm md:text-base'>{vid.name}</div>
        )}
        {vid.published_at && (
          <div className='text-sm text-slate-400'>
            {toDateStr(vid.published_at)}
          </div>
        )}
      </div>
    </a>
  )
}
