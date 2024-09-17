import { useAtom } from 'jotai'
import { Div } from '~/components/ui/div'
import { Img } from '~/components/ui/img'
import { displaySetting } from '~/lib/state'
import { DISPLAY_OPTION } from '~/types/enum'
import { Episode } from '~/types/tmdb'
import { imgUrls } from '~/util/img'
import { genRuntimeStr } from '~/util/runtime'

export function EpisodeCard({ x }: { x: Episode }) {
  const [displayOption] = useAtom(displaySetting)

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

  const rowCard = (
    <>
      <div className='flex flex-row rounded-xl bg-slate-800 md:transition-colors md:hover:bg-slate-700'>
        <Img
          src={`${imgUrls.w500}${x.still_path}`}
          className='max-w-[200px] rounded-xl rounded-r-none md:max-w-[300px]'
          width={500}
        />
        <div className='flex flex-col gap-1 p-2 text-sm md:text-base'>
          <div className='line-clamp-1'>{pri}</div>
          <Div value={x.overview} className='line-clamp-2 xl:line-clamp-3' />
          <div className='line-clamp-1 text-slate-400'>{sec}</div>
        </div>
      </div>
    </>
  )

  const colCard = (
    <>
      <div className='flex flex-col rounded-xl bg-slate-800 md:transition-colors md:hover:bg-slate-700'>
        <Img
          src={`${imgUrls.w500}${x.still_path}`}
          className='rounded-t-xl'
          width={500}
        />
        <div className='flex flex-col gap-1 p-2 text-sm md:text-base'>
          <div className='line-clamp-1'>{pri}</div>
          <Div value={x.overview} className='line-clamp-1' />
          <div className='line-clamp-1 text-slate-400'>{sec}</div>
        </div>
      </div>
    </>
  )

  if (displayOption === DISPLAY_OPTION.Rows) return rowCard
  if (displayOption === DISPLAY_OPTION.Columns) return colCard
}
