export type Resolver<T, Args> = (_: unknown, args: Args) => Promise<T>
