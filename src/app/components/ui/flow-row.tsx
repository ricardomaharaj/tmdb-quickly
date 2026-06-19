import { ReactNode } from "preact/compat"

export function FlowRow({
	className,
	children,
}: {
	className?: string
	children?: ReactNode
}) {
	return (
		<div className={`flex flex-row gap-2 overflow-x-scroll ${className ?? ""}`}>
			{children}
		</div>
	)
}
