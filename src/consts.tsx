export const IMG_URLs = {
    ORIGINAL: 'https://image.tmdb.org/t/p/original',
    W500: 'https://image.tmdb.org/t/p/w500',
    W94H141: 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2',
    W150H225: 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2',
    W227H127: 'https://www.themoviedb.org/t/p/w227_and_h127_bestv2'
}

export const LOAD_SILHOUETTE = (
    <div className='bg-slate-800 rounded-xl'>
        <div className='flex flex-row p-2 xl:p-10'>
            <div className='bg-slate-700 mr-2 rounded-xl w-[150px] h-[225px]'></div>
            <div className='flex flex-col space-y-2'>
                <div className='bg-slate-700 w-[150px] p-2 rounded-xl' />
                <div className='bg-slate-700 w-[100px] p-2 rounded-xl' />
                <div className='bg-slate-700 w-[50px]  p-2 rounded-xl' />
            </div>
        </div>
    </div>
)

export const APP_NAME = 'TMDB Quickly'

export const MAX_OVERVIEW_LENGTH = 100
