import { imageUrls } from '~/util/image-urls'

export function AdaptImg({ path }: { path?: string }) {
  if (!path) {
    return (
      <div className='bg-primary-700 h-[141px] w-[94px] rounded-xl md:w-[150px]'></div>
    )
  }
  return (
    <>
      <div className='md:hidden'>
        <img
          src={`${imageUrls.w94h141}/${path}`}
          className='max-w-[94px] rounded-xl'
          width={94}
          height={141}
          loading='lazy'
          alt=''
        />
      </div>
      <div className='hidden md:block'>
        <img
          src={`${imageUrls.w300h450}/${path}`}
          className={`max-w-[150px] rounded-xl`}
          width={150}
          height={200}
          loading='lazy'
          alt=''
        />
      </div>
    </>
  )
}
