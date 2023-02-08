import { imageUrls } from '../consts'

type Props = {
  poster_path: string
}

export function AdaptablePoster(props: Props) {
  const { poster_path } = props

  return (
    <>
      <img
        src={`${imageUrls.W94H141}${poster_path}`}
        className='mr-2 max-h-[141px] max-w-[94px] rounded-xl md:hidden'
        loading='lazy'
        width={94}
        height={141}
        alt=''
      />
      <img
        src={`${imageUrls.W150H225}${poster_path}`}
        className='mr-2 hidden max-h-[225px] max-w-[150px] rounded-xl md:block'
        loading='lazy'
        width={150}
        height={225}
        alt=''
      />
    </>
  )
}
