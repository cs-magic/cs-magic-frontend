import { baseApi } from '@/states/api/baseApi'
import { ITokenData, IUserLogin } from '@/ds/auth'

export const TAG_AUTH = 'auth'

export const authApi = baseApi
	.enhanceEndpoints({
		addTagTypes: [TAG_AUTH],
	})
	.injectEndpoints({
		endpoints: (builder) => ({
			
			sendEmailVerificationCode: builder.mutation<string, string>({
				query: (arg) => {
					return {
						url: `/auth/send-email-verification-code?email=${arg}`,
						method: 'POST',
					}
				},
				
			}),
			
			verifyEmail: builder.mutation<string, { email: string, code: string }>({
				query: (arg) => {
					return {
						url: `/auth/verify-email?email=${arg.email}&code=${arg.code}`,
						method: 'POST',
					}
				},
			}),
			
			checkUsername: builder.mutation<string, string>({
				query: (arg) => {
					return {
						url: `/auth/check-username?username=${arg}`,
						method: 'POST',
					}
				},
			}),
			
			register: builder.mutation<string, FormData>({
				query: (arg) => {
					return {
						url: `/auth/create-user`,
						method: 'POST',
						body: arg,
						formData: true, // ref: https://stackoverflow.com/a/76343589/9422455
					}
				},
			}),
			
			
			grantToken: builder.mutation<ITokenData, IUserLogin>({
				query: (arg) => {
					// todo: best practice on formData
					const formData = new FormData()
					formData.append('username', arg.username)
					formData.append('password', arg.password)
					if (arg.scope) {
						formData.append('scope', arg.scope)
					}
					return {
						url: `/auth/token`,
						method: 'POST',
						body: formData,
						formData: true, // ref: https://stackoverflow.com/a/76343589/9422455
					}
				},
			}),
			
		}),
	})


export const {
	useSendEmailVerificationCodeMutation,
	useVerifyEmailMutation,
	useCheckUsernameMutation,
	useRegisterMutation,
	useGrantTokenMutation,
} = authApi

