import { Poster } from './poster'
import { Filler } from './filler-image'
import { Link } from 'react-router-dom'

type Props = {
  image?: string
  primary?: string
  secondary?: string
  tertiary?: string
  href?: string
  variant: 'movie' | 'tv' | 'person'
}

export function PosterCard(props: Props) {
  const { image, primary, secondary, variant, tertiary, href } = props
  return (
    <Link to={href || '/'} className='link row rounded-xl p-2'>
      <div className='col'>
        {image ? <Poster src={image} /> : <Filler variant={variant} />}
      </div>
      <div className='col'>
        {primary && <div>{primary}</div>}
        {tertiary && <div className='subtext'>{tertiary}</div>}
        {secondary && <div className='subtext'>{secondary}</div>}
      </div>
    </Link>
  )
}
