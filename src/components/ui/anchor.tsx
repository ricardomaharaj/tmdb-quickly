export function Anchor({
  children,
  ...props
}: { children?: React.ReactNode } & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  return (
    <a target='_blank' rel='noreferrer' {...props}>
      {children}
    </a>
  )
}
