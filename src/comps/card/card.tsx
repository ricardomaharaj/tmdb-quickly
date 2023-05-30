import Image from 'next/image'
import Link from 'next/link'
import { imageUrls } from '~/util/image-urls'

type Props = {
  image?: string
  primary?: string
  secondary?: string
  tertiary?: string
  href?: string
}

export function Card(props: Props) {
  const { image, primary, secondary, tertiary, href } = props

  const body = (
    <>
      {image && (
        <Image
          src={`${imageUrls.w94h141}${image}`}
          width={94}
          height={141}
          className='max-h-[141px] max-w-[94px]'
          alt=''
        />
      )}
      <div className='col ml-2 mt-1'>
        {primary && <div>{primary}</div>}
        {secondary && <div>{secondary}</div>}
        {tertiary && <div className='line-clamp-3'>{tertiary}</div>}
      </div>
    </>
  )

  if (href)
    return (
      <>
        <Link className='row border-2' href={href}>
          {body}
        </Link>
      </>
    )
  else
    return (
      <>
        <div className='row border-2'>{body}</div>
      </>
    )
}
