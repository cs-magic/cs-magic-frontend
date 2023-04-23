const tokenCentre: Record<string, string> = {}

export const setTokenCentre = (key: string, val: string) => {
	tokenCentre[key] = val
	console.log('token centre set, cur:', tokenCentre)
}

export const getTokenCenter = (key: string): string | undefined => {
	console.log('current token centre: ', tokenCentre)
	return tokenCentre[key]
}
