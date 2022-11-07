import { Cast } from '../../interfaces/Person'

import { MovieCard } from './cast/MovieCard'
import { ShowCard } from './cast/ShowCard'

type Props = {
    cast: Cast
}
export function CastCard({ cast }: Props) {
    const { media_type } = cast
    if (media_type === 'movie') {
        return <MovieCard movie={cast} />
    }
    if (media_type === 'tv') {
        return <ShowCard show={cast} />
    }
    return <></>
}
