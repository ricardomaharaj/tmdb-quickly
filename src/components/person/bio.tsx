import { gql } from 'urql'
import { usePersonQuery } from '~/components/person/query'
import { PersonProps } from '~/types/props'
import { bioSplitter } from '~/util/bio-splitter'

const gqlQuery = gql`
  query ($id: String!) {
    person(id: $id) {
      biography
    }
  }
`

export default function Bio({ id }: PersonProps) {
  const [res] = usePersonQuery(gqlQuery, { id })
  const person = res.data?.person

  return (
    <>
      {person?.biography && (
        <div className='bubble space-y-4'>
          {bioSplitter(person.biography).map((x, i) => (
            <p key={i}>{x}</p>
          ))}
        </div>
      )}
    </>
  )
}
