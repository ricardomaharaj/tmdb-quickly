import { Btn } from '~/components/ui/btn'

export function Pager({
  page,
  pgUp,
  pgDown,
}: {
  page: number
  pgUp: () => void
  pgDown: () => void
}) {
  return (
    <div className='flex flex-row justify-evenly md:justify-start md:gap-2'>
      <Btn
        className='px-8 py-0.5 md:px-6 md:py-0'
        disabled={page === 1}
        onClick={pgDown}
      >
        <i className='icon-[ic--round-keyboard-arrow-left] mt-2 text-2xl' />
      </Btn>

      <div className='mt-2 px-8 py-0.5 md:px-6 md:py-0'>{page}</div>

      <Btn className='px-8 py-0.5 md:px-6 md:py-0' onClick={pgUp}>
        <i className='icon-[ic--round-keyboard-arrow-right] mt-2 text-2xl' />
      </Btn>
    </div>
  )
}
