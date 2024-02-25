import Link from 'next/link'
import { Div } from '~/components/ui/div'
import { imgUrls } from '~/util/img'

export function BackdropCard({
  bgImg,

  to,
  toText,

  pri,
  sec,
  ter,
}: {
  bgImg?: string

  to?: string
  toText?: string

  pri?: string
  sec?: string
  ter?: string
}) {
  const shouldLink = !!to && !!toText

  return (
    <div
      className='rounded-xl bg-cover bg-center'
      style={{
        backgroundImage: `url("${imgUrls.w500}${bgImg}")`,
      }}
    >
      <div className='rounded-xl bg-black bg-opacity-60 p-10 md:p-20 lg:backdrop-blur-sm xl:p-24 2xl:p-28'>
        <div className='flex flex-col gap-1 xl:text-lg'>
          {shouldLink && (
            <Link href={to} className='font-medium'>
              {toText}
            </Link>
          )}
          <Div value={pri} />
          <Div value={sec} />
          <Div value={ter} />
        </div>
      </div>
    </div>
  )
}
