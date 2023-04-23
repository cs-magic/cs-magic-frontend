import NextAuth, { NextAuthOptions } from 'next-auth'

import EmailProvider from 'next-auth/providers/email'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'

import { createTransport } from 'nodemailer'
import { generateVerificationToken } from '@/lib/utils'
import { AUTH_DB_NAME, EMAIL_FROM, EMAIL_SERVER } from '@/lib/env'
import { setTokenCentre } from '@/pages/api/auth/general'


export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise, { databaseName: AUTH_DB_NAME }),
	
	providers: [
		EmailProvider({
			server: EMAIL_SERVER,
			from: EMAIL_FROM,
			// maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
			generateVerificationToken,
			
			async sendVerificationRequest(params) {
				const { identifier, url, provider, theme, token } = params
				const transport = createTransport(provider.server)
				const result = await transport.sendMail({
					to: identifier,
					from: provider.from,
					subject: `【CS魔法社】验证码：${token}`,
					// text: text({ url, host }),
					// html: html({ url, host, theme }),
				})
				setTokenCentre(identifier, token)
				const failed = result.rejected.concat(result.pending).filter(Boolean)
				if (failed.length) throw new Error(`Email (${failed.join(', ')}) could not be sent`)
			},
		}),
	],
	callbacks: {
		session({ session, token, user }) {
			// console.log('session', { session, token, user })
			session.user.id = session.user.email
			return session // The return type will match the one returned in `useSession()`
		},
		
		// 不要覆写 signIn 函数，否则默认的 verification 就不起作用了 （关键是很难写！）
	},
	
	pages: {
		signIn: '/auth/signin',
		// error: '/auth/signin',
	},
}

export default NextAuth(authOptions)
