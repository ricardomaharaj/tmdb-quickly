export function Bubble({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={`rounded-xl bg-slate-800 p-4 ${className ?? ''}`}>
      {children}
    </div>
  )
}
