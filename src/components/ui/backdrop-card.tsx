import Link from 'next/link'
import { Card } from '~/components/ui/card'
import { Div } from '~/components/ui/div'
import { Img } from '~/components/ui/img'
import { imgUrls } from '~/util/img'

export function BackdropCard({
  bgImg,
  img,

  to,
  toText,

  pri,
  sec,
  ter,
}: {
  bgImg?: string
  img?: string

  to?: string
  toText?: string

  pri?: string
  sec?: string
  ter?: string
}) {
  if (!bgImg) {
    return <Card noHover img={img} pri={pri} sec={sec} ter={ter} />
  }

  return (
    <>
      <div
        className='rounded-xl bg-cover bg-center'
        style={{
          backgroundImage: `url("${imgUrls.w500}${bgImg}")`,
        }}
      >
        <div
          className={`
            flex min-h-[150px] flex-row rounded-xl bg-black bg-opacity-75
            ${img ? 'p-2 md:p-8' : 'p-8 md:p-16'}
          `}
        >
          {img && (
            <Img
              src={`${imgUrls.w94h141}${img}`}
              className='mr-2 h-[141px] w-[94px] rounded-xl'
            />
          )}
          <div className='flex flex-col gap-1'>
            {to && toText && (
              <Link href={to}>
                <Div value={toText} className='font-medium' />
              </Link>
            )}
            <Div value={pri} />
            <Div value={sec} />
            <Div value={ter} />
          </div>
        </div>
      </div>
    </>
  )
}
