import { numGt0 } from '~/util/validation'

export function Div({
  value,
  children,

  ...attr
}: { value?: string | number | boolean } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  if (!value) return <></>
  if (typeof value === 'number' && !numGt0(value)) return <></>
  else return <div {...attr}>{children ?? value}</div>
}
