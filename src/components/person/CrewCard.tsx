import { Crew } from '../../interfaces/Person'

import { MovieCard } from './crew/MovieCard'
import { ShowCard } from './crew/ShowCard'

type Props = {
    crew: Crew
}
export function CrewCard({ crew }: Props) {
    const { media_type } = crew
    if (media_type === 'movie') {
        return <MovieCard movie={crew} />
    }
    if (media_type === 'tv') {
        return <ShowCard show={crew} />
    }
    return <></>
}
