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
      <input
        type='text'
        placeholder='Search'
        defaultValue={defaultValue}
        onChange={(e) => onValueChange(e.currentTarget.value)}
        className={`w-full rounded-xl bg-slate-800 p-3 ${className ?? ''}`}
      />
    </>
  )
}
