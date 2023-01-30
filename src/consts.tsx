export const imageUrls = {
  ORIGINAL: 'https://image.tmdb.org/t/p/original',
  W500: 'https://image.tmdb.org/t/p/w500',
  W94H141: 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2',
  W150H225: 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2',
  W227H127: 'https://www.themoviedb.org/t/p/w227_and_h127_bestv2',
  W640H360: 'https://www.themoviedb.org/t/p/w640_and_h360_bestv2'
}

export const loadSilhouette = (
  <div className='bg-slate-800 rounded-xl'>
    <div className='row p-2 xl:p-10'>
      <div className='bg-slate-700 rounded-xl mr-2 w-[94px] h-[141px] md:w-[150px] md:h-[225px]'></div>
      <div className='col space-y-2'>
        <div className='bg-slate-700 w-[150px] p-2 rounded-xl' />
        <div className='bg-slate-700 w-[100px] p-2 rounded-xl' />
        <div className='bg-slate-700 w-[50px]  p-2 rounded-xl' />
      </div>
    </div>
  </div>
)

export const posterCardSilhouette = (
  <div className='row bg-slate-800 rounded-xl'>
    <div className='bg-slate-700 rounded-xl m-2 w-[94px] h-[141px]'></div>
    <div className='col mt-2 space-y-2'>
      <div className='bg-slate-700 rounded-xl p-2 w-[150px]'></div>
      <div className='bg-slate-700 rounded-xl p-2 w-[100px]'></div>
      <div className='bg-slate-700 rounded-xl p-2 w-[50px]'></div>
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
