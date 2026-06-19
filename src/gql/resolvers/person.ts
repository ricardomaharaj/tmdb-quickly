import { Person } from "~/types/gql"
import { Resolver } from "~/types/resolver"
import { filterCombinedCast } from "../util/filter-combined-cast"
import { filterCombinedCrew } from "../util/filter-combined-crew"
import { filterImages } from "../util/filter-images"
import { tmdbFetch } from "../util/tmdb-fetch"

type Args = {
	id: string
	query: string
	page: number
	filter: string
}

export const personResolver: Resolver<Person, Args> = async (_, args) => {
	const res = await tmdbFetch(`/person/${args.id}`, {
		append_to_response: "combined_credits,images",
	})

	const person: Person = await res.json()

	return {
		...person,
		combined_credits: {
			cast: filterCombinedCast({
				cast: person.combined_credits?.cast,
				query: args.query,
				page: args.page,
				filter: args.filter,
			}),
			crew: filterCombinedCrew({
				crew: person.combined_credits?.crew,
				query: args.query,
				page: args.page,
				filter: args.filter,
			}),
		},
		images: {
			profiles: filterImages({
				images: person.images?.profiles,
				page: args.page,
			}),
		},
	}
}
