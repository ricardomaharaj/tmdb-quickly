export function Anchor({
  children,
  ...props
}: {
  children?: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a target='_blank' {...props}>
      {children}
    </a>
  )
}
