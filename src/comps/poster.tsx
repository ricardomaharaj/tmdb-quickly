import { imageUrls } from '../consts'

type Props = {
  src: string
}

export function Poster(props: Props) {
  const { src } = props

  return (
    <img
      src={`${imageUrls.W94H141}${src}`}
      className='rounded-xl mr-2 max-w-[94px] max-h-[141px]'
      loading='lazy'
      width={94}
      height={141}
      alt=''
    />
  )
}
