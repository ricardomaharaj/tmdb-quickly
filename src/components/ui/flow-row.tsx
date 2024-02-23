export function FlowRow({ children }: { children?: React.ReactNode }) {
  return (
    <div className='flex flex-row gap-2 overflow-x-scroll md:overflow-x-hidden'>
      {children}
    </div>
  )
}
