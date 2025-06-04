import { appName } from '~/app/util/consts'
import { Link } from './link'

export function Header() {
  return (
    <div className='my-4 flex flex-row justify-center'>
      <Link href='/'>
        <div className='text-2xl uppercase md:text-3xl'>{appName}</div>
      </Link>
    </div>
  )
}
