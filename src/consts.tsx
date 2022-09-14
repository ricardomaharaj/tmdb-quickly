export const IMG_URLs = {
    ORIGINAL: 'https://image.tmdb.org/t/p/original',
    W500: 'https://image.tmdb.org/t/p/w500',
    W94H141: 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2',
    W150H225: 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2',
    W227H127: 'https://www.themoviedb.org/t/p/w227_and_h127_bestv2'
}

export interface State {
    query: string
    page: number
    homeTab: string
}

export interface Props {
    state: State
    updateState: (update: Partial<State>) => void
}
