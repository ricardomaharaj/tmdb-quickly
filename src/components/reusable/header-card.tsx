import { AdaptImg } from '~/components/reusable/adapt-img'
import { imageUrls } from '~/util/image-urls'

export function HeaderCard({
  pri,
  sec,
  ter,
  poster,
  backdrop,
}: {
  pri?: string
  sec?: string
  ter?: string
  poster?: string
  backdrop?: string
}) {
  return (
    <>
      <div
        className='rounded-xl bg-cover bg-center'
        style={{
          backgroundImage: `url('${imageUrls.w500}/${backdrop}')`,
        }}
      >
        <div className='row rounded-xl bg-black bg-opacity-50 p-2 lg:p-8 lg:backdrop-blur-sm'>
          <AdaptImg path={poster} />
          <div className='col ml-2'>
            <div className='font-bold lg:text-lg xl:text-xl'>{pri}</div>
            <div className='text-sm lg:text-base'>{sec}</div>
            <div className='text-sm lg:text-base'>{ter}</div>
          </div>
        </div>
      </div>
    </>
  )
}
