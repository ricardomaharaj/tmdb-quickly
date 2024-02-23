import Link from 'next/link'
import { Div } from '~/components/ui/div'
import { Img } from '~/components/ui/img'
import { imgUrls } from '~/util/img'

export function Card({
  img,

  to,

  pri,
  sec,
  ter,

  noHover,
  noPlaceholder,
}: {
  img?: string

  to?: string

  pri?: string
  sec?: string
  ter?: string

  noHover?: boolean
  noPlaceholder?: boolean
}) {
  return (
    <div
      className={`
        flex flex-row rounded-xl bg-slate-800 p-2
        ${noHover ? '' : 'transition-colors hover:bg-slate-700'}
      `}
    >
      {img ? (
        <Img
          src={`${imgUrls.w94h141}${img}`}
          className='mr-2 h-[141px] max-h-[141px] w-[94px] max-w-[94px] rounded-xl'
        />
      ) : noPlaceholder ? (
        <></>
      ) : (
        <div className='mr-2 h-[141px] min-h-[141px] w-[94px] min-w-[94px] rounded-xl bg-slate-600' />
      )}
      <div className='flex flex-col gap-1'>
        {to ? (
          <Link href={to}>
            <Div value={pri} className='line-clamp-1 font-medium' />
          </Link>
        ) : (
          <Div value={pri} className='line-clamp-1' />
        )}
        <Div value={sec} className='line-clamp-1' />
        <Div value={ter} className='line-clamp-3 text-slate-400' />
      </div>
    </div>
  )
}
