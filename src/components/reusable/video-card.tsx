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
      <Link
        href={href}
        target='_blank'
        className='col bg-primary-800 rounded-xl'
      >
        <div className='row'>
          <img
            src={src}
            width={480}
            height={360}
            alt=''
            className='rounded-xl rounded-b-none'
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
