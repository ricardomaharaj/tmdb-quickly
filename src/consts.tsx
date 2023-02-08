export const imageUrls = {
  ORIGINAL: 'https://image.tmdb.org/t/p/original',
  W500: 'https://image.tmdb.org/t/p/w500',
  W94H141: 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2',
  W150H225: 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2',
  W227H127: 'https://www.themoviedb.org/t/p/w227_and_h127_bestv2',
  W640H360: 'https://www.themoviedb.org/t/p/w640_and_h360_bestv2'
}

export const loadSilhouette = (
  <div className='rounded-xl bg-slate-800'>
    <div className='row p-2 xl:p-10'>
      <div className='mr-2 h-[141px] w-[94px] rounded-xl bg-slate-700 md:h-[225px] md:w-[150px]'></div>
      <div className='col space-y-2'>
        <div className='w-[150px] rounded-xl bg-slate-700 p-2' />
        <div className='w-[100px] rounded-xl bg-slate-700 p-2' />
        <div className='w-[50px] rounded-xl  bg-slate-700 p-2' />
      </div>
    </div>
  </div>
)

export const posterCardSilhouette = (
  <div className='row rounded-xl bg-slate-800'>
    <div className='m-2 h-[141px] w-[94px] rounded-xl bg-slate-700'></div>
    <div className='col mt-2 space-y-2'>
      <div className='w-[150px] rounded-xl bg-slate-700 p-2'></div>
      <div className='w-[100px] rounded-xl bg-slate-700 p-2'></div>
      <div className='w-[50px] rounded-xl bg-slate-700 p-2'></div>
    </div>
  </div>
)

export const appName = 'TMDB Quickly'

export const maxOverviewLength = 100

export const releaseTypes = [
  '',
  'Premiere',
  'Theatrical (limited)',
  'Theatrical',
  'Digital',
  'Physical',
  'TV'
]
