import { imageUrls } from '../consts'

type Props = {
    src: string
}
export function Poster(props: Props) {
    const { src } = props
    return (
        <img
            src={`${imageUrls.W94H141}${src}`}
            alt='poster'
            className='max-w-[94px] max-h-[141px] rounded-xl mr-2'
            width='94px'
            height='141px'
            loading='lazy'
        />
    )
}
