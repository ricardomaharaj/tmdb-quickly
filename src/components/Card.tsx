import { Poster } from './Poster'
import { Filler } from './Filler'
import { Link } from 'react-router-dom'

type Props = {
    image?: string
    primary?: string
    secondary?: string
    tertiary?: string
    href?: string
    variant: 'movie' | 'tv' | 'person'
}

export function Card(props: Props) {
    const { image, primary, secondary, variant, tertiary, href } = props
    return (
        <Link
            to={href || '/'}
            className='flex flex-row bg-slate-800 hover:bg-slate-700 rounded-xl p-2'
        >
            <div className='flex flex-col'>
                {image ? <Poster src={image} /> : <Filler variant={variant} />}
            </div>
            <div className='flex flex-col'>
                {primary && <div>{primary}</div>}
                {tertiary && <div className='text-slate-400'>{tertiary}</div>}
                {secondary && <div className='text-slate-400'>{secondary}</div>}
            </div>
        </Link>
    )
}
