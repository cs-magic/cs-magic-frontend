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
			
		}),
	})


export const {
	useSendEmailVerificationCodeMutation,
} = authApi

