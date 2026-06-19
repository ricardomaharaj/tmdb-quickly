import { AnchorHTMLAttributes } from "preact"
import { ReactNode } from "preact/compat"

export function Anchor({
	children,

	...attr
}: {
	children?: ReactNode
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
	return (
		<a target="_blank" {...attr}>
			{children}
		</a>
	)
}
