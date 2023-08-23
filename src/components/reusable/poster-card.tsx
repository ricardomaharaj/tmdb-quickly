import Image from 'next/image'
import { imageUrls } from '~/util/image-urls'

type Props = {
  path?: string
  pri?: string
  sec?: string
  ter?: string
}

export function PosterCard({ path, pri, sec, ter }: Props) {
  return (
    <>
      <div className='row rounded-xl bg-primary-800 p-2'>
        {path ? (
          <Image
            src={`${imageUrls.w500}/${path}`}
            width={100}
            height={0}
            className='mr-2 rounded-xl'
            alt=''
          />
        ) : (
          <i className='mr-2 h-[150px] w-[100px] rounded-xl bg-primary-700' />
        )}
        <div className='col'>
          {pri && <div className='font-medium'>{pri}</div>}
          {sec && <div className='font-medium text-subtext'>{sec}</div>}
          {ter && <div className='line-clamp-3 text-subtext'>{ter}</div>}
        </div>
      </div>
    </>
  )
}
