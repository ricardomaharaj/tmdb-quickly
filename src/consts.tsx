export const IMG_URLs = {
    ORIGINAL: 'https://image.tmdb.org/t/p/original',
    W500: 'https://image.tmdb.org/t/p/w500',
    W94H141: 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2',
    W150H225: 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2',
    W227H127: 'https://www.themoviedb.org/t/p/w227_and_h127_bestv2'
}

export const ADVANCED_SEARCH_ICON = (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill='currentColor'
        viewBox='0 0 16 16'
    >
        <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
    </svg>
)

const LOADER__SEARCH_CARD = (
    <>
        <div className='bg3 rounded-xl w-[94px] h-[141px]'></div>
        <div className='col space-y-1 pl-2'>
            <div className='row bg3 p-2 w-[150px] rounded-full' />
            <div className='row bg3 p-2 w-[100px] rounded-full' />
            <div className='row bg3 p-2 w-[50px] rounded-full' />
        </div>
    </>
)

export const LOADER__SEARCH_CARD_ARRAY: Array<JSX.Element> = new Array(9).fill(
    LOADER__SEARCH_CARD
)

export const MAX_OVERVIEW_LENGTH = 100
