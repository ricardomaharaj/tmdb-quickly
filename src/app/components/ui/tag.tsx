export function Tag({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      // prettier-ignore
      className={`
        whitespace-nowrap rounded-xl bg-slate-800 px-3 py-1 
        ${className ?? ''} 
      `}
    >
      {children}
    </div>
  )
}
