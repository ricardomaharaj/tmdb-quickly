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
  if (!bgImg || bgImg === 'undefined') return <></>

  return (
    <div
      className='rounded-xl bg-cover bg-center'
      style={{
        backgroundImage: `url("${imgUrls.w500}${bgImg}")`,
      }}
    >
      <div className='rounded-xl p-10 backdrop-brightness-50 md:p-20'>
        <div className='flex flex-col gap-1 xl:text-lg'>
          <Div value={pri}>
            <a href={to ?? '/'} className='font-bold'>
              {pri}
            </a>
          </Div>
          <Div value={sec} />
          <Div value={ter} />
        </div>
      </div>
    </div>
  )
}
