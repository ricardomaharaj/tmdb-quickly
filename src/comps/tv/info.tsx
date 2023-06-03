import { gql, useQuery } from 'urql'
import { ID } from '~/types/id'
import { TV } from '~/types/tmdb'
import { Queries } from './types'

const query = gql`
  query ($id: ID!) {
    tv(id: $id) {
      overview
      production_companies {
        name
      }
      networks {
        name
      }
    }
  }
`

type Data = { tv?: TV }
type Vars = { id: ID }
function useInfoQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

type Props = { queries: Queries }

export default function Info(props: Props) {
  const { queries } = props
  const { id } = queries
  const [res] = useInfoQuery({ id })
  const tv = res?.data?.tv

  const companies: string[] = []
  tv?.networks?.forEach((x) => x.name && companies.push(x.name))
  tv?.production_companies?.forEach((x) => x.name && companies.push(x.name))
  const companySet = Array.from(new Set(companies))

  return (
    <>
      <div className='row mb-2 border-2 p-2'>
        <div>{tv?.overview}</div>
      </div>
      <div className='row space-x-2 overflow-scroll'>
        {companySet.map((x, i) => (
          <div className='whitespace-nowrap border-2 px-2 text-sm' key={i}>
            {x}
          </div>
        ))}
      </div>
    </>
  )
}
