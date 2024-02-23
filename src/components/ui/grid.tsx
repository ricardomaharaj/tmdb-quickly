export function Grid({
  variant,
  children,
}: {
  variant: '123' | '234'
  children?: React.ReactNode
}) {
  if (variant === '123')
    return (
      <>
        <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
          {children}
        </div>
      </>
    )

  if (variant === '234')
    return (
      <>
        <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4'>
          {children}
        </div>
      </>
    )

  return <></>
}
