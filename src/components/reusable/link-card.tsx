import Link from 'next/link'
import { imageUrls } from '~/util/image-urls'

type Props = {
  href: string
  path?: string
  pri?: string
  sec?: string
  ter?: string
}

export function LinkCard({ href, path, pri, sec, ter }: Props) {
  return (
    <>
      <Link className='row rounded-xl bg-primary-800 p-2' href={href}>
        {path ? (
          <img
            src={`${imageUrls.w94h141}/${path}`}
            width={94}
            height={141}
            className='rounded-xl'
            alt=''
          />
        ) : (
          <div className='h-[141px] w-[94px] rounded-xl bg-primary-700'></div>
        )}
        <div className='col ml-2'>
          {pri && <div className='font-bold'>{pri}</div>}
          {sec && <div className='text-subtext'>{sec}</div>}
          {ter && <div className='line-clamp-3 text-subtext'>{ter}</div>}
        </div>
      </Link>
    </>
  )
}
