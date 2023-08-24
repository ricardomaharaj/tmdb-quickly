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
          backgroundImage: backdrop
            ? `url('${imageUrls.w500}/${backdrop}')`
            : 'none',
        }}
      >
        <div
          className={`col space-y-2 rounded-xl bg-black bg-opacity-60 p-6 ${className}`}
        >
          {pri && <div>{pri}</div>}
          {sec && <div>{sec}</div>}
          {ter && <div className='line-clamp-1'>{ter}</div>}
        </div>
      </div>
    </>
  )
}
