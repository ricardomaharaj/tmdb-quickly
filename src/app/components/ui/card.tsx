import { imgUrls } from "~/app/util/consts"
import { Div } from "./div"
import { Link } from "./link"

export function Card({
	img,

	pri,
	sec,
	ter,

	href,
}: {
	img?: string

	pri?: string
	sec?: string
	ter?: string

	href?: string
}) {
	const title = (() => {
		const content: string[] = []

		if (pri) content.push(pri)
		if (sec) content.push(sec)
		if (ter) content.push(ter)

		return content.join(" | ")
	})()

	const minW = "min-w-30 md:min-w-30"
	const maxW = "max-w-30 md:max-w-30"
	const minH = "min-h-40 md:min-h-45"
	const maxH = "max-h-40 md:max-h-45"

	const mainContent = (
		<div
			className={`flex flex-col ${maxW} rounded-xl bg-slate-800 md:transition-colors md:hover:bg-slate-700`}
			title={href ? undefined : title}
		>
			<div
				className={`rounded-t-xl bg-cover bg-center ${minW} ${minH} ${maxW} ${maxH}`}
				style={{ backgroundImage: `url("${imgUrls.w220h330}${img}")` }}
			/>

			<div className="flex flex-col gap-1 p-2 text-xs">
				<Div value={pri} className="line-clamp-1" />
				<Div value={sec} className="line-clamp-1 text-slate-400" />
				<Div value={ter} className="line-clamp-1 text-slate-400" />
			</div>
		</div>
	)

	if (href) {
		return (
			<Link href={href} title={title}>
				{mainContent}
			</Link>
		)
	}

	return mainContent
}
