import { Anchor } from '~/components/ui/anchor'
import { Div } from '~/components/ui/div'
import { Img } from '~/components/ui/img'
import { VideoResult } from '~/types/tmdb'
import { toDateStr } from '~/util/date-str'

export function VideoCard({ x }: { x: VideoResult }) {
  return (
    <Anchor
      href={`https://m.youtube.com/watch?v=${x.key}`}
      className='flex flex-col rounded-xl bg-slate-800 md:transition-colors md:hover:bg-slate-700'
    >
      <Img
        src={`https://i.ytimg.com/vi/${x.key}/hq720.jpg`}
        className='aspect-video rounded-t-xl'
      />

      <div className='flex flex-col p-2'>
        <Div value={x.name} className='line-clamp-2 text-sm md:text-base' />
        <Div
          value={toDateStr(x.published_at)}
          className='text-sm text-slate-400'
        />
      </div>
    </Anchor>
  )
}
