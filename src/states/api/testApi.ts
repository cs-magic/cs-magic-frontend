import { baseApi } from '@/states/api/baseApi'
import { ICallChatgpt } from '@/ds/openai/chatgpt'


export const testApi = baseApi
	.enhanceEndpoints({
		// addTagTypes: [TAG_USER],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			
			callChatgpt: build.mutation<string, ICallChatgpt>({
				query: (arg) => ({
					url: `/simple/user-call-chatgpt`,
					method: 'POST',
					body: arg,
					credentials: 'include',
				}),
			}),
		}),
	})


export const {
	useCallChatgptMutation,
} = testApi
