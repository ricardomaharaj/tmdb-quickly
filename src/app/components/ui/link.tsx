export function Link({
  children,

  ...attr
}: {
  children?: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...attr}>{children}</a>
}
