// type hint for process environment variables, ref: https://github.com/nextauthjs/next-auth-example/blob/main/process.d.ts
declare namespace NodeJS {
  export interface ProcessEnv {
		NEXT_PUBLIC_BACKEND_ENDPOINT: string
	  NEXT_PUBLIC_FPJS_API_KEY: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
	  EMAIL_SERVER: string
	  EMAIL_FROM: string
  }
}
