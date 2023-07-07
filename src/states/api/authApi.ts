import { baseApi } from '@/states/api/baseApi'

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
						method: 'post',
					}
				},
				
			}),
			
			verifyEmail: builder.mutation<string, { email: string, code: string }>({
				query: (arg) => {
					return {
						url: `/auth/verify-email?email=${arg.email}&code=${arg.code}`,
						method: 'post',
					}
				},
			}),
			
			checkUsername: builder.mutation<string, string>({
				query: (arg) => {
					return {
						url: `/auth/check-username?username=${arg}`,
						method: 'post',
					}
				},
			}),
			
			
		}),
	})


export const {
	useSendEmailVerificationCodeMutation,
	useVerifyEmailMutation,
	useCheckUsernameMutation,
} = authApi

