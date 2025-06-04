import { toDateStr } from '~/app/util/date-str'
import { VideoResult } from '~/server/types/gql'
import { Anchor } from './anchor'
import { Div } from './div'
import { Img } from './img'

export function VideoCard({ x }: { x: VideoResult }) {
  return (
    <Anchor
      href={`https://m.youtube.com/watch?v=${x.key}`}
      title={`${x.name || ''}`}
    >
      <div className='w-[200px] rounded-xl bg-slate-800 md:transition-colors md:hover:bg-slate-700'>
        <Img
          src={`https://i.ytimg.com/vi/${x.key}/hq720.jpg`}
          className='aspect-video w-full rounded-t-xl'
        />

        <div className='flex flex-col p-2 text-xs'>
          <Div value={x.name} className='line-clamp-1' />
          <Div
            value={toDateStr(x.published_at)}
            className='text-xs text-slate-400'
          />
        </div>
      </div>
    </Anchor>
  )
}
