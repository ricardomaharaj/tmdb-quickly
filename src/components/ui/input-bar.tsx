export function InputBar({
  className,
  defaultValue,
  onValueChange,
}: {
  className?: string
  defaultValue?: string
  onValueChange: (str: string) => void
}) {
  return (
    <>
      <div className='flex w-full flex-row'>
        <input
          type='text'
          placeholder='Search'
          defaultValue={defaultValue}
          onChange={(e) => onValueChange(e.target.value)}
          className={`
            w-full rounded-xl bg-slate-800 p-2
            ${className ?? ''}
          `}
        />
      </div>
    </>
  )
}
