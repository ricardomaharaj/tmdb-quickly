import { Btn } from '~/components/ui/btn'
import { FlowRow } from '~/components/ui/flow-row'

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
    <FlowRow>
      <Btn
        withHover
        className='px-6 py-2 md:px-4'
        disabled={page === 1}
        onClick={pgDown}
      >
        {'<'}
      </Btn>
      <div className='p-2'>{page}</div>
      <Btn withHover className='px-6 py-2 md:px-4' onClick={pgUp}>
        {'>'}
      </Btn>
    </FlowRow>
  )
}
