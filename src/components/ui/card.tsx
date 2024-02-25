import { Div } from '~/components/ui/div'
import { Img } from '~/components/ui/img'
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
  return (
    <div className='flex h-full flex-col rounded-xl bg-slate-800 md:transition-colors md:hover:bg-slate-700'>
      {img ? (
        <Img src={`${imgUrls.w220h330}${img}`} className='rounded-t-xl' />
      ) : (
        <div className='h-full w-full rounded-t-xl bg-slate-600' />
      )}

      <div className='rounded-b-xl p-2 text-sm'>
        <Div value={pri} className='line-clamp-2' />
        <Div value={sec} className='line-clamp-2 text-slate-400' />
        <Div value={ter} className='line-clamp-1 text-slate-400' />
      </div>
    </div>
  )
}
