import Image from 'next/image'
import Link from 'next/link'

type Props = {
  ytKey?: string
  pri?: string
  sec?: string
}

export function VideoCard(props: Props) {
  const { ytKey, pri, sec } = props

  if (!ytKey) return <></>

  return (
    <>
      <Link
        href={`https://www.youtube.com/watch?v=${ytKey}`}
        target='_blank'
        className='col hover-hint rounded-xl bg-primary-800'
      >
        <div className='row'>
          <Image
            src={`https://i.ytimg.com/vi/${ytKey}/hq720.jpg`}
            width={500}
            height={0}
            className='rounded-xl rounded-b-none'
            alt=''
          />
        </div>
        <div className='col p-2'>
          <p className='line-clamp-1 text-sm md:text-base'>{pri}</p>
          {sec && (
            <div className='text-sm text-subtext'>{sec.split('T').at(0)}</div>
          )}
        </div>
      </Link>
    </>
  )
}
