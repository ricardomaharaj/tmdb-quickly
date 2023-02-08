import { imageUrls } from '../consts'

type Props = {
  src: string
}

export function Poster(props: Props) {
  const { src } = props

  return (
    <img
      src={`${imageUrls.W94H141}${src}`}
      className='mr-2 max-h-[141px] max-w-[94px] rounded-xl'
      loading='lazy'
      width={94}
      height={141}
      alt=''
    />
  )
}
