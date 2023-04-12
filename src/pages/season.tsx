import { Link, useParams, useSearchParams } from 'react-router-dom'
import { AdaptablePoster } from '../comps/adaptable-poster'
import { EpisodeCard } from '../comps/episode-card'
import { ImageGrid } from '../comps/image-grid'
import { VideoCard } from '../comps/video-card'
import { imageUrls, loadSilhouette } from '../consts'
import { useSeasonQuery, useShowQuery } from '../gql'
import { toDateString } from '../util'

enum Tabs {
  Episodes = 'EPISODES',
  Images = 'IMAGES',
  Videos = 'VIDEOS'
}

export function Season() {
  const [params, setParams] = useSearchParams()

  const tab = params.get('tab') || Tabs.Episodes

  const replaceSearchParams = (update: any) =>
    setParams({ tab, ...update }, { replace: true })

  const { id, season_number } = useParams()
  const show = useShowQuery({ id })[0].data?.show
  const { data, fetching, error } = useSeasonQuery({ id, season_number })[0]
  const season = data?.season

  if (fetching) return loadSilhouette

  if (error) return <div className='err'>{error.message}</div>

  return (
    <>
      <div
        className='rounded-xl bg-cover bg-center'
        style={{
          backgroundImage: `url(${imageUrls.W500}${show?.backdrop_path})`
        }}
      >
        <div className='row blur-bg'>
          {season?.poster_path && (
            <AdaptablePoster poster_path={season?.poster_path} />
          )}
          <div className='col space-y-1'>
            {show?.name && (
              <Link className='font-bold' to={`/tv/${id}`}>
                {show?.name}
              </Link>
            )}
            {season?.name && <div>{season.name}</div>}
            {season?.episodes?.length && (
              <div>{`${season.episodes.length} Episodes`}</div>
            )}
            {season?.air_date && <div>{toDateString(season.air_date)}</div>}
          </div>
        </div>
      </div>
      <div className='row scroll-hide space-x-2'>
        {Object.values(Tabs).map((x, i) => (
          <button
            className={`btn ${tab === x && 'sel'}`}
            onClick={() => replaceSearchParams({ tab: x })}
            key={i}
          >
            {x}
          </button>
        ))}
      </div>
      {tab === Tabs.Episodes && (
        <div className='col space-y-2'>
          {season?.episodes?.map((x, i) => (
            <EpisodeCard episode={x} key={i} />
          ))}
        </div>
      )}
      {tab === Tabs.Images && (
        <ImageGrid variant='234' images={season?.images?.posters} />
      )}
      {tab === Tabs.Videos && (
        <div className='grid234'>
          {season?.videos?.results?.map((x, i) => (
            <VideoCard video={x} key={i} />
          ))}
        </div>
      )}
    </>
  )
}
