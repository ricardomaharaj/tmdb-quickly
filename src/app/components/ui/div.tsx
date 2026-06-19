import { HTMLAttributes } from "preact"
import { ReactNode } from "preact/compat"
import { numGt0 } from "~/app/util/validation"

export function Div({
	value,
	children,

	...attr
}: {
	value?: string | number | boolean
	children?: ReactNode
} & HTMLAttributes<HTMLDivElement>) {
	if (!value) return <></>
	if (typeof value === "number" && !numGt0(value)) return <></>
	else return <div {...attr}>{children ?? value}</div>
}
