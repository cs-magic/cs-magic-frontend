import NextAuth from "next-auth"
import { ID } from '@/ds/general'

declare module "next-auth" {
  /**
   * ref: https://next-auth.js.org/getting-started/typescript
   *
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
			id: ID,
      
      email: string,
    }
  }
}
