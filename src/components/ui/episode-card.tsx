import { Div } from '~/components/ui/div'
import { Img } from '~/components/ui/img'
import { Episode } from '~/types/tmdb'
import { imgUrls } from '~/util/img'
import { genRuntimeStr } from '~/util/runtime'

export function EpisodeCard({ x }: { x: Episode }) {
  const epNum = x.episode_number
  const epName = x.name

  const epAired = x.air_date
  const epRunTime = genRuntimeStr(x.runtime)

  const pri = (() => {
    let str: string | undefined

    if (!!epNum && !!epName) {
      str = `${epNum} | ${epName}`
    }

    return str ?? 'Unknown'
  })()

  const sec = (() => {
    let str = ''

    if (epAired) {
      str += `${epAired}`
      if (epRunTime) {
        str += ` | ${epRunTime}`
      }
      return str
    }

    if (epRunTime) {
      str += `${epRunTime}`
      return str
    }

    return str
  })()

  return (
    <div className='flex flex-col rounded-xl bg-slate-800 md:transition-colors md:hover:bg-slate-700'>
      <div className='hidden md:block'>
        <Img
          src={`${imgUrls.w500}${x.still_path}`}
          className='rounded-t-xl'
          width={500}
        />
      </div>
      <div className='block md:hidden'>
        <Img
          src={`${imgUrls.w320h180}${x.still_path}`}
          className='rounded-t-xl'
          width={500}
        />
      </div>
      <div className='flex flex-col gap-1 p-2 text-sm md:text-base'>
        <div className='line-clamp-1'>{pri}</div>
        <Div value={x.overview} className='line-clamp-1' />
        <div className='line-clamp-1 text-xs text-slate-400 md:text-sm'>
          {sec}
        </div>
      </div>
    </div>
  )
}
