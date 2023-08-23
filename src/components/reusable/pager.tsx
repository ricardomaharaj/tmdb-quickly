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
          className='btn rounded-xl bg-primary-800'
        >
          Back
        </button>
        <div className='rounded-xl bg-primary-800 px-4 py-1'>{page}</div>
        <button
          onClick={onPageUpClick}
          className='btn rounded-xl bg-primary-800'
        >
          Next
        </button>
      </div>
    </>
  )
}
