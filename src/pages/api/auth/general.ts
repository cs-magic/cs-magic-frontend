const tokenCentre: Map<string, string> = new Map()

export const setTokenCentre = (key: string, val: string) => {
	console.log(`setting token: {${key}: ${val}}`)
	tokenCentre.set(key, val)
}

export const getTokenCenter = (key: string): string | undefined => {
	const val = tokenCentre.get(key)
	console.log(`got token: {${key}: ${val}}`)
	return val
}
