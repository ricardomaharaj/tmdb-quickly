import Link from 'next/link'
import { Div } from '~/components/ui/div'
import { imgUrls } from '~/util/img'

export function BackdropCard({
  bgImg,

  to,

  pri,
  sec,
  ter,
}: {
  bgImg?: string

  to?: string

  pri?: string
  sec?: string
  ter?: string
}) {
  return (
    <div
      className='rounded-xl bg-cover bg-center'
      style={{
        backgroundImage: `url("${imgUrls.w500}${bgImg}")`,
      }}
    >
      <div className='rounded-xl bg-black bg-opacity-70 p-10 md:p-20 lg:backdrop-blur-sm xl:p-24 2xl:p-28'>
        <div className='flex flex-col gap-1 xl:text-lg'>
          <Div value={pri}>
            <Link href={to ?? '/'} className='font-medium'>
              {pri}
            </Link>
          </Div>
          <Div value={sec} />
          <Div value={ter} />
        </div>
      </div>
    </div>
  )
}
