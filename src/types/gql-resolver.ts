import { GqlArgs } from '~/types/gql-args'

export type GqlResolver<T> = (_: unknown, args: GqlArgs) => Promise<T>
