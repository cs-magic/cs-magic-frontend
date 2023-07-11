export const {
	// NEXT_PUBLIC_BACKEND_ENDPOINT,
	DATABASE_AUTH_DB_NAME,
	DATABASE_MONGO_URI,
	EMAIL_SERVER,
	EMAIL_FROM,
} = process.env

// can't use destruction, ref: javascript - Why are destructured environment variables undefined in Next.js? - Stack Overflow, https://stackoverflow.com/questions/67566552/why-are-destructured-environment-variables-undefined-in-next-js
export const NEXT_PUBLIC_BACKEND_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT
export const NEXT_PUBLIC_SOCKET_SERVER = process.env.NEXT_PUBLIC_SOCKET_SERVER

// callback url 直接设置成 / 不知道行不行
// export const NEXTAUTH_CALLBACK_URL = process.env.NEXT_PUBLIC_NEXTAUTH_CALLBACK_URL
// process.env.ENV === 'prod'
// ? 'https://cs-magic.com'
// : process.env.ENV === 'alpha'
// 	? 'https://alpha.cs-magic.com'
// 	: 'http://localhost:2002'
	
