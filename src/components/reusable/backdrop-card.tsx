import { imageUrls } from '~/util/image-urls'

type Props = {
  backdrop?: string
  pri?: string
  sec?: string
  ter?: string
  className?: string
}

export function BackdropCard({ backdrop, pri, sec, ter, className }: Props) {
  return (
    <>
      <div
        className={`rounded-xl bg-cover bg-center`}
        style={{
          backgroundImage: `url('${imageUrls.w500}/${backdrop}')`,
        }}
      >
        <div
          className={`col space-y-2 rounded-xl bg-black bg-opacity-50 p-6 ${className}`}
        >
          {pri && <div className='font-medium'>{pri}</div>}
          {sec && <div className='text-sm font-medium'>{sec}</div>}
          {ter && <div className='line-clamp-1 text-sm'>{ter}</div>}
        </div>
      </div>
    </>
  )
}
