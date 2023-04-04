import Card from '@/comps/card'
import { Tabs } from '@/pages/movie/[id]'
import { CastMember, CrewMember } from '@/types/movie-credits'
import { api } from '@/util/local-api'
import { useEffect, useState } from 'react'

interface Props {
  query: string
  page: number
  tab: Tabs
  id: string | number
  updateQueries: (update: any) => void
}
export function MovieCredits(props: Props) {
  const { query, page, tab, id, updateQueries } = props

  let { cast, crew } = useCredits({ id })

  const perPage = 9
  const startPage = (page - 1) * perPage
  const endPage = page * perPage

  const q = query.toLowerCase()

  cast = cast
    .filter(({ name, character }) => {
      if (!q) return true
      if (name?.toLowerCase().includes(q)) return true
      if (character?.toLowerCase().includes(q)) return true
      return false
    })
    .slice(startPage, endPage)

  crew = crew
    .filter(({ name, job }) => {
      if (!q) return true
      if (name?.toLowerCase().includes(q)) return true
      if (job?.toLowerCase().includes(q)) return true
      return false
    })
    .slice(startPage, endPage)

  return (
    <>
      <div className='row'>
        <input
          type='text'
          className='w-full border-2 p-1 pl-2'
          placeholder='Filter'
          defaultValue={query}
          onChange={(e) => updateQueries({ query: e.target.value })}
        />
      </div>
      <div className='grid123'>
        {tab === Tabs.Cast &&
          cast.map((x) => (
            <Card
              img={x.profile_path}
              href={{
                pathname: '/person/[id]',
                query: { id: x.id },
              }}
              secondary={x.name}
              primary={x.character}
              variant='person'
              key={x.id}
            />
          ))}
        {tab === Tabs.Crew &&
          crew.map((x) => (
            <Card
              img={x.profile_path}
              href={{
                pathname: '/person/[id]',
                query: { id: x.id },
              }}
              secondary={x.name}
              primary={x.job}
              variant='person'
              key={x.id}
            />
          ))}
      </div>
      <div className='row justify-evenly pt-2'>
        <button
          onClick={() => updateQueries({ page: page - 1 })}
          className='px-8'
        >
          {'<'}
        </button>
        <div>{page}</div>
        <button
          onClick={() => updateQueries({ page: page + 1 })}
          className='px-8'
        >
          {'>'}
        </button>
      </div>
    </>
  )
}
interface Args {
  id: string | number
}
function useCredits(args: Args) {
  const { id } = args
  const [cast, setCast] = useState<CastMember[]>([])
  const [crew, setCrew] = useState<CrewMember[]>([])
  useEffect(() => {
    api
      .get('movie', { params: { id } })
      .then((x) => {
        setCast(x.cast)
        setCrew(x.crew)
      })
      .catch((e) => console.log(e))
  }, [])

  return { cast, crew }
}
