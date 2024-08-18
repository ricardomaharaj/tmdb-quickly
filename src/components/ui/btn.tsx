export function Btn({
  onClick,

  disabled,

  isActive,

  className,
  children,
}: {
  onClick?: () => void

  disabled?: boolean

  isActive?: boolean

  className?: string
  children?: React.ReactNode
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      // prettier-ignore
      className={`
        rounded-xl 
        ${isActive ? 'bg-slate-700' : 'bg-slate-800'} 
        disabled:bg-slate-900 disabled:text-slate-400 disabled:hover:bg-slate-900 md:transition-colors md:hover:bg-slate-600 
        ${className ?? ''}
      `}
    >
      {children}
    </button>
  )
}
