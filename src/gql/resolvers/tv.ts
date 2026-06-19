import { TV } from "~/types/gql"
import { Resolver } from "~/types/resolver"
import { filterAggregateCast } from "../util/filter-aggregate-cast"
import { filterAggregateCrew } from "../util/filter-aggregate-crew"
import { filterImages } from "../util/filter-images"
import { getPaginatePos } from "../util/paginate-pos"
import { tmdbFetch } from "../util/tmdb-fetch"

type Args = {
	id: string
	query: string
	page: number
}

export const tvResolver: Resolver<TV, Args> = async (_, args) => {
	const res = await tmdbFetch(`/tv/${args.id}`, {
		append_to_response: "aggregate_credits,external_ids,images,videos",
	})

	const tv: TV = await res.json()

	const { start, end } = getPaginatePos(args.page ?? 1)

	return {
		...tv,
		aggregate_credits: {
			cast: filterAggregateCast({
				cast: tv.aggregate_credits?.cast,
				query: args.query,
				page: args.page,
			}),
			crew: filterAggregateCrew({
				crew: tv.aggregate_credits?.crew,
				query: args.query,
				page: args.page,
			}),
		},
		images: {
			posters: filterImages({
				images: tv.images?.posters,
				page: args.page,
			}),
			backdrops: filterImages({
				images: tv.images?.backdrops,
				page: args.page,
			}),
		},
		videos: {
			results: tv.videos?.results?.slice(start, end),
		},
	}
}
