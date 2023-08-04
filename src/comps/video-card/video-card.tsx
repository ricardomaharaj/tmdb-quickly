import Image from 'next/image'
import Link from 'next/link'

type Props = {
  href?: string
  src?: string
  primary?: string
  secondary?: string
}

export function VideoCard(props: Props) {
  const { href, src, primary, secondary } = props

  if (!href || !src) return <></>

  return (
    <>
      <Link href={href} target='_blank' className='col border-2'>
        <div className='row'>
          <Image src={src} width={480} height={360} alt='' />
        </div>
        <div className='col m-1 text-sm'>
          <p>{primary}</p>
          {secondary && <div className='my-1 text-xs'>{secondary}</div>}
        </div>
      </Link>
    </>
  )
}
