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
        className='rounded-xl mr-2 max-w-[94px] max-h-[141px] md:hidden'
        loading='lazy'
        width='94'
        height='141'
        alt=''
      />
      <img
        src={`${imageUrls.W150H225}${poster_path}`}
        className='rounded-xl mr-2 max-w-[150px] max-h-[225px] hidden md:block'
        loading='lazy'
        width='150'
        height='225'
        alt=''
      />
    </>
  )
}
