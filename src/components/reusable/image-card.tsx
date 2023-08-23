import Image from 'next/image'
import { imageUrls } from '~/util/image-urls'

type Props = {
  path?: string
}

export function ImageCard({ path }: Props) {
  return (
    <>
      <a href={`${imageUrls.original}${path}`} target='_blank'>
        <Image src={`${imageUrls.w500}${path}`} width={500} height={0} alt='' />
      </a>
    </>
  )
}
