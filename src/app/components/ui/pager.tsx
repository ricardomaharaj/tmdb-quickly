import { icon } from '~/app/util/consts'
import { Btn } from './btn'

export function Pager({
  page,
  pgUp,
  pgDown,
  loading,
}: {
  page: number
  pgUp: () => void
  pgDown: () => void
  loading?: boolean
}) {
  return (
    <>
      <Btn
        className='flex flex-row items-center px-4 py-3'
        disabled={page === 1 || loading}
        onClick={pgDown}
        aria-label='Go back 1 page'
      >
        <i className={`${icon.arrowLeft} text-xl`} title='Go back 1 page' />
      </Btn>

      <Btn
        className='flex flex-row items-center px-4 py-3'
        disabled={loading}
        onClick={pgUp}
        aria-label='Go forward 1 page'
      >
        <i className={`${icon.arrowRight} text-xl`} title='Go forward 1 page' />
      </Btn>
    </>
  )
}
