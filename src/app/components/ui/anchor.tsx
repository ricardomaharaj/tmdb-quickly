export function Anchor({
  children,

  ...attr
}: {
  children?: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a target='_blank' {...attr}>
      {children}
    </a>
  )
}
