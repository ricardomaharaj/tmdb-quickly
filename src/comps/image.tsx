import { imageUrls } from '~/consts'

type Props = {
  src?: string
}
export function Img(props: Props) {
  const { src } = props
  return (
    <>
      {src ? (
        <img
          src={`${imageUrls.w94h141}${src}`}
          className='max-h-[141px] max-w-[94px]'
          loading='lazy'
          alt=''
        />
      ) : (
        <div className='h-[141px] w-[94px] border-2' />
      )}
    </>
  )
}
