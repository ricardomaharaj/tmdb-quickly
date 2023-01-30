import { Link, useParams, useSearchParams } from 'react-router-dom'
import { toDateString } from '../util'
import { imageUrls, loadSilhouette } from '../consts'
import { useSeasonQuery, useShowQuery } from '../gql'
import { VideoCard } from '../comps/video-card'
import { AdaptablePoster } from '../comps/adaptable-poster'
import { EpisodeCard } from '../comps/episode-card'
import { ImageGrid } from '../comps/image-grid'

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
  const [res] = useSeasonQuery({ id, season_number })
  const { data, fetching, error } = res
  const season = data?.season

  if (fetching) return loadSilhouette

  if (error) return <div className='err'>{error.message}</div>

  return (
    <>
      <div
        className='bg-cover bg-center rounded-xl'
        style={{
          backgroundImage: `url(${imageUrls.W500}${show?.backdrop_path})`
        }}
      >
        <div className='blur-bg'>
          {season?.poster_path && (
            <AdaptablePoster poster_path={season?.poster_path} />
          )}
          <div className='col space-y-1'>
            {show?.name && (
              <Link className='font-bold plain' to={`/tv/${id}`}>
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
      <div className='scroll-row'>
        {Object.values(Tabs).map((x, i) => (
          <button
            className={`${tab === x && 'sel'}`}
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
