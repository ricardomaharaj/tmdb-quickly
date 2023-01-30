import { imageUrls } from '../consts'

type Image = {
  iso_639_1?: string
  file_path?: string
}

type Props = {
  variant: '123' | '234'
  images?: Image[]
}

export function ImageGrid(props: Props) {
  const { variant, images } = props

  return (
    <>
      <div
        className={`grid gap-2 ${
          variant === '123'
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
        }`}
      >
        {images
          ?.filter(({ iso_639_1 }) => iso_639_1 === 'en' || !iso_639_1)
          ?.map((x, i) => (
            <a
              href={`${imageUrls.ORIGINAL}${x.file_path}`}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-slate-900 hover:bg-slate-900 p-0'
              key={i}
            >
              <img
                src={`${imageUrls.W500}${x.file_path}`}
                loading='lazy'
                alt=''
              />
            </a>
          ))}
      </div>
    </>
  )
}
