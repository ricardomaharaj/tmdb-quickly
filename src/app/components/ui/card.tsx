import { imgUrls } from '~/app/util/img'
import { Div } from './div'
import { Img } from './img'

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
  const title = (() => {
    const content: string[] = []

    if (pri) content.push(pri)
    if (sec) content.push(sec)
    if (ter) content.push(ter)

    return content.join(' | ')
  })()

  return (
    <>
      <div className='flex h-full w-[110px] flex-col rounded-xl bg-slate-800 md:w-[140px] md:transition-colors md:hover:bg-slate-700'>
        {img ? (
          <Img src={`${imgUrls.w220h330}${img}`} className='rounded-t-xl' />
        ) : (
          <div className='flex h-full flex-col justify-center'>
            <i className='icon-[ic--person-outline] mx-auto text-6xl' />
          </div>
        )}

        <div className='p-2 text-xs md:text-sm' title={title}>
          <Div value={pri} className='line-clamp-1' />
          <Div value={sec} className='line-clamp-1 text-slate-400' />
          <Div value={ter} className='line-clamp-1 text-slate-400' />
        </div>
      </div>
    </>
  )
}
