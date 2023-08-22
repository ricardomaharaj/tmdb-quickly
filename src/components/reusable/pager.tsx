import { MouseEventHandler } from 'react'

type Props = {
  page: number
  onPageDownClick: MouseEventHandler<HTMLButtonElement>
  onPageUpClick: MouseEventHandler<HTMLButtonElement>
}

export function Pager({ page, onPageDownClick, onPageUpClick }: Props) {
  return (
    <>
      <div className='row mt-2 space-x-2'>
        <button
          disabled={page <= 1}
          onClick={onPageDownClick}
          className='bg-primary-800 rounded-xl px-4 py-1'
        >
          Back
        </button>
        <div className='bg-primary-800 rounded-xl px-4 py-1 '>{page}</div>
        <button
          onClick={onPageUpClick}
          className='bg-primary-800 rounded-xl px-4 py-1'
        >
          Next
        </button>
      </div>
    </>
  )
}
