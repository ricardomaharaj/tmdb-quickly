import { Anchor } from '~/components/ui/anchor'
import { Img } from '~/components/ui/img'
import { Image } from '~/types/gql'
import { imgUrls } from '~/util/img'

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
      className={`${variant === 'portrait' ? 'max-w-[120px] min-w-[120px]' : 'max-w-[220px] min-w-[220px]'}`}
    >
      <Img src={`${imgUrls.w500}${x.file_path}`} />
    </Anchor>
  )
}
