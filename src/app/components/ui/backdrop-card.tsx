import { Link } from '~/app/components/ui/link'
import { imgUrls } from '~/app/util/consts'
import { Div } from './div'

export function BackdropCard({
  bgImg,

  href: href,

  pri,
  sec,
  ter,
}: {
  bgImg?: string

  href?: string

  pri?: string
  sec?: string
  ter?: string
}) {
  if (!bgImg || bgImg === 'undefined') return <></>

  return (
    <div
      className='rounded-xl bg-cover bg-center'
      style={{
        backgroundImage: `url("${imgUrls.w500}${bgImg}")`,
      }}
    >
      <div className='rounded-xl p-10 backdrop-brightness-50 md:p-20 md:backdrop-blur-xs'>
        <div className='flex flex-col gap-1 xl:text-lg'>
          <Div value={pri} className='font-bold'>
            {href ? <Link href={href ?? '#'}>{pri}</Link> : pri}
          </Div>
          <Div value={sec} />
          <Div value={ter} />
        </div>
      </div>
    </div>
  )
}
