import { imgUrls } from '~/app/util/consts'
import { Div } from './div'
import { Img } from './img'
import { Link } from './link'

export function Card({
  img,

  pri,
  sec,
  ter,

  href,
}: {
  img?: string

  pri?: string
  sec?: string
  ter?: string

  href?: string
}) {
  const title = (() => {
    const content: string[] = []

    if (pri) content.push(pri)
    if (sec) content.push(sec)
    if (ter) content.push(ter)

    return content.join(' | ')
  })()

  const mainContent = (
    <div
      className={`flex min-h-full max-w-[100px] flex-col justify-end rounded-xl bg-slate-800 md:max-w-[140px] md:transition-colors md:hover:bg-slate-700`}
      title={href ? undefined : title}
    >
      {img ? (
        <Img
          src={`${imgUrls.w220h330}${img}`}
          className='max-h-fit max-w-fit rounded-t-xl'
        />
      ) : (
        <div className='min-w-[100px] md:min-w-[140px]' />
      )}

      <div className='flex flex-col gap-1 p-2 text-xs'>
        <Div value={pri} className='line-clamp-1' />
        <Div value={sec} className='line-clamp-1 text-slate-400' />
        <Div value={ter} className='line-clamp-1 text-slate-400' />
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} title={title}>
        {mainContent}
      </Link>
    )
  }

  return mainContent
}
