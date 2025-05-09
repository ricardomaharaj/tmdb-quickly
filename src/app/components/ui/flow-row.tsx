export function FlowRow({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={`flex flex-row gap-2 overflow-x-scroll ${className ?? ''}`}>
      {children}
    </div>
  )
}
