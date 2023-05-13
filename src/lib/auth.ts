export const generateVerificationToken = async (): Promise<string> =>
	Array.from(Array(4)).map(() => Math.floor(Math.random() * 10)).join('')
