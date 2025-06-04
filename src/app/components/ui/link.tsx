import { AnchorHTMLAttributes, ReactNode } from 'preact/compat'

type Props = {
  children?: ReactNode
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function Link({ children, ...props }: Props) {
  return <a {...props}>{children}</a>
}
