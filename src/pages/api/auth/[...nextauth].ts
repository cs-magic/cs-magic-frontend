import NextAuth, { NextAuthOptions } from 'next-auth'

import EmailProvider from 'next-auth/providers/email'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'

import nodemailer from 'nodemailer'

export const generateAuthtoken = async (): Promise<string> =>
	Array.from(Array(4)).map(() => Math.floor(Math.random() * 10)).join('')

export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise, {
		databaseName: 'auth',
	}),
	
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
			// maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
			generateVerificationToken: async () => {
				const token = await generateAuthtoken()
				return token
			},
			      sendVerificationRequest: ({
        identifier: email,
        url,
        token,
        provider,
      }) => {
        return new Promise((resolve, reject) => {
          const { server, from } = provider;
          // Strip protocol from URL and use domain as site name
          const site = url // todo: baseUrl

          nodemailer.createTransport(server).sendMail(
            {
              to: email,
              from,
              subject: `Authentication code: ${token}`,
	            // text: 'text template',
	            // html: 'html template',
              // text: text({ url, site, email, token }),
              // html: html({ url, site, email, token }),
            },
            (error) => {
              if (error) {
                // logger.error('SEND_VERIFICATION_EMAIL_ERROR', email, error);
                console.error('SEND_VERIFICATION_EMAIL_ERROR', email, error);
                return reject(
                  new Error(`SEND_VERIFICATION_EMAIL_ERROR ${error}`)
                );
              }
              return resolve();
            }
          );
        });
      },
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			// console.log('signIn', { user, account, profile, email, credentials })
			// store.dispatch(initUser())
			return true
		},
		
		session({ session, token, user }) {
			// console.log('session', { session, token, user })
			session.user.id = session.user.email
			return session // The return type will match the one returned in `useSession()`
		},
	},
	
	pages: {
		signIn: '/auth/signin'
	}
}

export default NextAuth(authOptions)
