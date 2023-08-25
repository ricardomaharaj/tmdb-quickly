import { gql } from 'urql'
import { Overview } from '~/components/reusable/overview'
import { TVProps } from '~/types/props'
import { dateStr } from '~/util/date-str'
import { useTVQuery } from './query'

const gqlQuery = gql`
  query ($id: String!) {
    tv(id: $id) {
      first_air_date
      last_air_date
      number_of_episodes
      number_of_seasons
      origin_country
      original_language
      original_name
      overview
      status
      type
      genres {
        name
      }
      networks {
        name
      }
      production_companies {
        name
      }
      external_ids {
        imdb_id
      }
    }
  }
`

export default function Info({ id }: TVProps) {
  const [res] = useTVQuery(gqlQuery, { id })
  const tv = res.data?.tv

  const companies: string[] = []
  tv?.networks?.forEach((x) => !!x.name && companies.push(x.name))
  tv?.production_companies?.forEach((x) => !!x.name && companies.push(x.name))
  const companySet = Array.from(new Set(companies))

  return (
    <>
      <Overview fetching={res.fetching} overview={tv?.overview} />

      <div className='col bubble'>
        {tv?.status && <div>Status: {tv?.status}</div>}
        {tv?.type && <div>Type: {tv?.type}</div>}
        {tv?.first_air_date && (
          <div>First Aired: {dateStr(tv?.first_air_date)}</div>
        )}
        {tv?.last_air_date && (
          <div>Last Aired: {dateStr(tv?.last_air_date)}</div>
        )}
        {tv?.number_of_seasons && <div>Seasons: {tv?.number_of_seasons}</div>}
        {tv?.number_of_episodes && (
          <div>Episodes: {tv?.number_of_episodes}</div>
        )}
        {tv?.origin_country && <div>Origin Country: {tv?.origin_country}</div>}
        {tv?.original_language && (
          <div>Original Language: {tv?.original_language}</div>
        )}
        {tv?.original_name && <div>Original Name: {tv?.original_name}</div>}
        {tv?.external_ids?.imdb_id && (
          <div>
            <a
              href={`https://www.imdb.com/title/${tv.external_ids.imdb_id}`}
              target='_blank'
              className='underline'
            >
              IMDB
            </a>
            <span>{` ID: ${tv.external_ids.imdb_id}`}</span>
          </div>
        )}
        <div>
          <a
            href={`https://www.themoviedb.org/tv/${id}`}
            target='_blank'
            className='underline'
          >
            TMDB
          </a>
          <span>{` ID: ${id}`}</span>
        </div>
      </div>

      <div className='row overscroll mb-2 space-x-2'>
        {tv?.genres?.map((x, i) => (
          <div className='tag' key={i}>
            {x.name}
          </div>
        ))}
      </div>

      <div className='row overscroll space-x-2'>
        {companySet.map((x, i) => (
          <div className='tag' key={i}>
            {x}
          </div>
        ))}
      </div>
    </>
  )
}
