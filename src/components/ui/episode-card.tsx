import { Div } from '~/components/ui/div'
import { Img } from '~/components/ui/img'
import { Episode } from '~/types/gql'
import { imgUrls } from '~/util/img'
import { genRuntimeStr } from '~/util/runtime'

export function EpisodeCard({ x }: { x: Episode }) {
  const epNum = x.episode_number
  const epName = x.name

  const epAired = x.air_date
  const epRunTime = genRuntimeStr(x.runtime)

  const pri = (() => {
    const content: string[] = []
    if (epNum) content.push(`${epNum}`)
    if (epName) content.push(epName)

    if (content.length === 0) return 'Unknown'
    return content.join(' | ')
  })()

  const sec = (() => {
    const content: string[] = []

    if (epAired) content.push(epAired)
    if (epRunTime) content.push(epRunTime)

    if (content.length === 0) return 'Unknown'
    return content.join(' | ')
  })()

  return (
    <>
      <div className='flex w-[220px] flex-col rounded-xl bg-slate-800 md:transition-colors md:hover:bg-slate-700'>
        <Img
          src={`${imgUrls.w500}${x.still_path}`}
          className='rounded-t-xl'
          width={500}
        />
        <div
          className='flex flex-col gap-1 p-2 text-xs md:text-sm'
          title={`${pri} | ${x.overview} | ${sec}`}
        >
          <div className='line-clamp-1'>{pri}</div>
          <Div value={x.overview} className='line-clamp-1' />
          <div className='line-clamp-1 text-slate-400'>{sec}</div>
        </div>
      </div>
    </>
  )
}
