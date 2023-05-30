import { MouseEventHandler } from 'react'

type Props = {
  page: number
  onPageDownClick: MouseEventHandler<HTMLButtonElement>
  onPageUpClick: MouseEventHandler<HTMLButtonElement>
}

export function Pager(props: Props) {
  const { page, onPageDownClick, onPageUpClick } = props

  return (
    <>
      <div className='row space-x-2'>
        <button
          disabled={page <= 1}
          className='border-2 px-2'
          onClick={onPageDownClick}
        >
          Back
        </button>
        <div className='border-2 px-4'>{page}</div>
        <button className='border-2 px-2' onClick={onPageUpClick}>
          Next
        </button>
      </div>
    </>
  )
}
