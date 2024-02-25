import { Anchor } from '~/components/ui/anchor'
import { Img } from '~/components/ui/img'
import { Image } from '~/types/tmdb'
import { imgUrls } from '~/util/img'

export function ImageLink({ x }: { x: Image }) {
  return (
    <Anchor href={`${imgUrls.original}${x.file_path}`}>
      <Img src={`${imgUrls.w500}${x.file_path}`} />
    </Anchor>
  )
}
