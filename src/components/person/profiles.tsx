import { gql } from 'urql'
import { usePersonQuery } from '~/components/person/query'
import { ImageCard } from '~/components/reusable/image-card'
import { PersonProps } from '~/types/props'

const gqlQuery = gql`
  query ($id: String!, $page: Int) {
    person(id: $id, page: $page) {
      images {
        profiles {
          file_path
        }
      }
    }
  }
`

export default function Profiles(props: PersonProps) {
  const [res] = usePersonQuery(gqlQuery, props)
  const profiles = res.data?.person?.images?.profiles

  return (
    <>
      <div className='grid234'>
        {profiles?.map((x, i) => <ImageCard path={x.file_path} key={i} />)}
      </div>
    </>
  )
}
