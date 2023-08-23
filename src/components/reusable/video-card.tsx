import Image from 'next/image'
import Link from 'next/link'

type Props = {
  ytKey?: string
  primary?: string
  secondary?: string
}

export function VideoCard(props: Props) {
  const { ytKey, primary, secondary } = props

  if (!ytKey) return <></>

  return (
    <>
      <Link
        href={`https://www.youtube.com/watch?v=${ytKey}`}
        target='_blank'
        className='col rounded-xl bg-primary-800'
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
        <div className='col p-2 text-sm'>
          <p className='line-clamp-2'>{primary}</p>
          {secondary && <div className='my-1 text-xs'>{secondary}</div>}
        </div>
      </Link>
    </>
  )
}
