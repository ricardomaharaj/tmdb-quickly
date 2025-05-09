import { appName } from '~/app/util/consts'

export function Header() {
  return (
    <div className='my-4 flex flex-row justify-center'>
      <a href='/'>
        <div className='ml-10 text-2xl uppercase md:text-3xl'>{appName}</div>
      </a>
    </div>
  )
}
