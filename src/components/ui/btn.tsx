export function Btn({
  onClick,
  disabled,
  isActive,
  withHover,

  className,
  children,
}: {
  onClick?: () => void
  disabled?: boolean
  isActive?: boolean
  withHover?: boolean

  className?: string
  children?: React.ReactNode
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        rounded-xl px-4 py-2 md:px-3 md:py-1
        ${isActive ? 'bg-slate-700' : 'bg-slate-800'}
        ${withHover ? 'transition-colors hover:bg-slate-600' : ''}
        disabled:bg-slate-900 disabled:text-slate-400 disabled:hover:bg-slate-900
        ${className}
      `}
    >
      {children}
    </button>
  )
}
