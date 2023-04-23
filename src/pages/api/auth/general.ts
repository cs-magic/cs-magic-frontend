const tokenCentre = new Map<string, string>()

export const setTokenCentre = (key: string, val: string) => {
	tokenCentre.set(key, val)
	console.log('token centre set, cur:', tokenCentre)
}

export const getTokenCenter = (key: string): string | undefined => {
	console.log('current token centre: ', tokenCentre)
	return tokenCentre.get(key)
}
