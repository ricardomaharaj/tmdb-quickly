import { imageUrls } from '../consts'

type Props = {
    src: string
}
export function Poster({ src }: Props) {
    return (
        <img
            src={`${imageUrls.W94H141}${src}`}
            className='max-w-[94px] max-h-[141px] rounded-xl mr-2'
            loading='lazy'
        />
    )
}
