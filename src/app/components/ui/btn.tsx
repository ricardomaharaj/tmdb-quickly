export function Btn({
  isActive,

  className,
  children,

  ...attr
}: {
  isActive?: boolean
  children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      // prettier-ignore
      className={`
        rounded-xl 
        ${isActive ? 'bg-slate-700' : 'bg-slate-800'} 
        disabled:bg-slate-900 disabled:text-slate-400 disabled:hover:bg-slate-900 md:transition-colors md:hover:bg-slate-600 
        ${className ?? ''}
      `}
      {...attr}
    >
      {children}
    </button>
  )
}
