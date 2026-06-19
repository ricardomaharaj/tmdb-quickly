import { imgUrls } from "~/app/util/consts"
import { genRuntimeStr } from "~/app/util/runtime"
import { Episode } from "~/types/gql"
import { Div } from "./div"

export function EpisodeCard({ x, href }: { x: Episode; href: string }) {
	const epNum = x.episode_number
	const epName = x.name

	const epAired = x.air_date
	const epRunTime = genRuntimeStr(x.runtime)

	const pri = (() => {
		const content: string[] = []
		if (epNum) content.push(`${epNum}`)
		if (epName) content.push(epName)

		if (content.length === 0) return "Unknown"
		return content.join(" | ")
	})()

	const sec = (() => {
		const content: string[] = []

		if (epAired) content.push(epAired)
		if (epRunTime) content.push(epRunTime)

		if (content.length === 0) return "Unknown"
		return content.join(" | ")
	})()

	const minW = "min-w-40 md:min-w-50"
	const maxW = "max-w-40 md:max-w-50"
	const minH = "min-h-25 md:min-h-30"
	const maxH = "max-h-25 md:max-h-30"

	return (
		<a href={href} title={`${pri} | ${x.overview} | ${sec}`}>
			<div
				className={`flex flex-col justify-end rounded-xl bg-slate-800 md:transition-colors md:hover:bg-slate-700`}
			>
				<div
					className={`rounded-t-xl bg-cover bg-center ${minW} ${minH} ${maxW} ${maxH}`}
					style={{
						backgroundImage: `url("${imgUrls.w500}${x.still_path}")`,
					}}
				/>

				<div className="flex flex-col gap-1 p-2 text-xs">
					<div className="line-clamp-1">{pri}</div>
					<Div className="line-clamp-1" value={x.overview} />
					<div className="line-clamp-1 text-slate-400">{sec}</div>
				</div>
			</div>
		</a>
	)
}
