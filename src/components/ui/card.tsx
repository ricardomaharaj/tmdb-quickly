import { useAtom } from 'jotai'
import { Div } from '~/components/ui/div'
import { Img } from '~/components/ui/img'
import { displaySetting } from '~/lib/state'
import { DISPLAY_OPTION } from '~/types/enum'
import { imgUrls } from '~/util/img'

export function Card({
  img,

  pri,
  sec,
  ter,
}: {
  img?: string

  pri?: string
  sec?: string
  ter?: string
}) {
  const [displayOption] = useAtom(displaySetting)

  const rowCard = (
    <>
      <div className='flex h-full flex-row rounded-xl bg-slate-800 md:transition-colors md:hover:bg-slate-700'>
        {img ? (
          <Img src={`${imgUrls.w94h141}${img}`} className='rounded-l-xl' />
        ) : (
          <div className='h-full w-[94px] rounded-l-xl bg-slate-600' />
        )}

        <div className='p-2'>
          <Div value={pri} className='line-clamp-1' />
          <Div value={sec} className='line-clamp-1 text-slate-400' />
          <Div value={ter} className='line-clamp-1 text-slate-400' />
        </div>
      </div>
    </>
  )

  const colCard = (
    <>
      <div className='flex h-full flex-col rounded-xl bg-slate-800 md:transition-colors md:hover:bg-slate-700'>
        {img ? (
          <Img src={`${imgUrls.w220h330}${img}`} className='rounded-t-xl' />
        ) : (
          <div className='h-full rounded-t-xl bg-slate-600' />
        )}

        <div className='p-2 text-sm'>
          <Div value={pri} className='line-clamp-1' />
          <Div value={sec} className='line-clamp-1 text-slate-400' />
          <Div value={ter} className='line-clamp-1 text-slate-400' />
        </div>
      </div>
    </>
  )

  if (displayOption === DISPLAY_OPTION.Rows) return rowCard
  if (displayOption === DISPLAY_OPTION.Columns) return colCard
}
