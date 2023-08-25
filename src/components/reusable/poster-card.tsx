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
      <div className='row hover-hint rounded-xl bg-primary-800 p-2'>
        {path ? (
          <Image
            src={`${imageUrls.w130h195}/${path}`}
            width={110}
            height={0}
            className='mr-2 rounded-xl'
            alt=''
          />
        ) : (
          <i className='mr-2 h-[165px] w-[100px] rounded-xl bg-primary-700' />
        )}
        <div className='col'>
          {pri && <div>{pri}</div>}
          {sec && <div className='text-subtext'>{sec}</div>}
          {ter && <div className='line-clamp-3 text-subtext'>{ter}</div>}
        </div>
      </div>
    </>
  )
}
