import { ChangeEventHandler, useRef } from 'react'

type Props = {
  query: string
  onInputChange: ChangeEventHandler<HTMLInputElement>
  onClearClick: () => void
}

export function QueryBar({ query, onInputChange, onClearClick }: Props) {
  const queryInputRef = useRef<HTMLInputElement>(null)

  function handleClearClick() {
    queryInputRef.current!.value = ''
    onClearClick()
  }

  return (
    <>
      <div className='row mb-2 rounded-xl bg-primary-800'>
        <input
          type='text'
          placeholder='Search'
          defaultValue={query}
          className='w-full rounded-xl bg-primary-800 p-2 pl-3'
          onChange={onInputChange}
          ref={queryInputRef}
        />
        {query && (
          <button
            onClick={handleClearClick}
            className='col justify-center pl-2'
          >
            <i className='icon-[mdi--close] mr-2 text-xl' />
          </button>
        )}
      </div>
    </>
  )
}
