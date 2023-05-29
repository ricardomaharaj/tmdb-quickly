import Image from 'next/image'
import { imageUrls } from '~/util/image-urls'

export function Poster({ path }: { path?: string }) {
  return (
    <>
      {path ? (
        <Image
          src={`${imageUrls.w94h141}${path}`}
          width={94}
          height={141}
          className='mr-2'
          alt=''
        />
      ) : (
        <div className='icon-[mdi--account] w-[94px] h-[141px] mr-2' />
      )}
    </>
  )
}
