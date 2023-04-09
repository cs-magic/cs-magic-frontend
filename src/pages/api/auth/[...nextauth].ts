import NextAuth, { NextAuthOptions } from 'next-auth'

import EmailProvider from 'next-auth/providers/email'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'


export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise, {
		databaseName: 'auth',
	}),
	
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
			// maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log('signIn', { user, account, profile, email, credentials })
			// store.dispatch(initUser())
			return true
		},
		
		session({ session, token, user }) {
			console.log('session', { session, token, user })
			session.user.id = session.user.email
			return session // The return type will match the one returned in `useSession()`
		},
	},
}

export default NextAuth(authOptions)
