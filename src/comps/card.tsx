import { Poster } from './poster'
import { Filler } from './filler'
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
            className='row bg-slate-800 hover:bg-slate-700 rounded-xl p-2'
        >
            <div className='col'>
                {image ? <Poster src={image} /> : <Filler variant={variant} />}
            </div>
            <div className='col'>
                {primary && <div>{primary}</div>}
                {tertiary && <div className='text-slate-400'>{tertiary}</div>}
                {secondary && <div className='text-slate-400'>{secondary}</div>}
            </div>
        </Link>
    )
}
