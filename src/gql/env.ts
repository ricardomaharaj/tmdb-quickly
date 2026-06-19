// @ts-expect-error
const netlifyEnv = globalThis?.Netlify?.env

function getEnvVar(key: string) {
	const envVar = netlifyEnv?.get(key) || process.env[key]
	if (!envVar) throw new Error(key)
	return envVar as string
}

export const env = {
	TMDB_API_KEY: getEnvVar("TMDB_API_KEY"),
}
