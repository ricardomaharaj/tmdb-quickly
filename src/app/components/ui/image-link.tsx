import { imgUrls } from '~/app/util/consts'
import { Image } from '~/server/types/gql'
import { Anchor } from './anchor'
import { Img } from './img'

export function ImageLink({
  x,
  variant,
}: {
  x: Image
  variant: 'portrait' | 'landscape'
}) {
  if (!x.file_path || x.file_path === 'undefined') return <></>

  return (
    <Anchor
      href={`${imgUrls.original}${x.file_path}`}
      className={`${variant === 'portrait' ? 'max-w-[100px] min-w-[100px]' : 'max-w-[200px] min-w-[200px]'}`}
    >
      <Img src={`${imgUrls.w500}${x.file_path}`} className='flex' />
    </Anchor>
  )
}
