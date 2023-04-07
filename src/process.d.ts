// type hint for process environment variables, ref: https://github.com/nextauthjs/next-auth-example/blob/main/process.d.ts
declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
	  EMAIL_SERVER: string
	  EMAIL_FROM: string
  }
}
