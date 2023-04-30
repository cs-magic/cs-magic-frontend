import { IConversation, ICreateConversation } from '@/ds/openai/conversation'
import { ID } from '@/ds/general'
import { baseApi } from '@/states/api/baseApi'
import { PlatformType } from '@/ds/openai/general'

export const TAG_CONVERSATION = 'conversation'

export const injectOpenAIConversation = <T extends PlatformType>() => {
	const conversationApi = baseApi
		// ref: https://github.com/reduxjs/redux-toolkit/issues/1510#issuecomment-1122564975
		.enhanceEndpoints({
			addTagTypes: [TAG_CONVERSATION],
		})
		
		.injectEndpoints({
			endpoints: (builder) => {
				
				return ({
					listConversations: builder.query<IConversation<T>[], { user_id: ID, platform_type: T }>({
						query: (arg) => ({
							url: `/${arg.platform_type}`,
							params: arg,
						}),
						providesTags: (result, error, arg) => (result ?? []).map((item) => ({ type: TAG_CONVERSATION, id: item.id })),
					}),
					
					createConversation: builder.mutation<ID, ICreateConversation<T>>({
						query: (arg) => ({
							url: `/${arg.platform_type}`,
							method: 'post',
							body: arg,
						}),
						invalidatesTags: [TAG_CONVERSATION],
					}),
					
					/**
					 * todo: 其实有时候更新一下conversation并不需要触发listConversation的刷新（可以client端直接更新）
					 */
					updateConversation: builder.mutation<ID, Partial<IConversation<T>> & { id: ID, platform_type: T }>({
						query: (arg) => ({
							url: `/${arg.platform_type}`,
							method: 'PATCH',
							body: arg,
						}),
						invalidatesTags: (result, error, arg) => [{ type: TAG_CONVERSATION, id: arg.id }],
					}),
					
					deleteConversation: builder.mutation<void, { id: ID, platform_type: T }>({
						query: (arg) => ({
							url: `/${arg.platform_type}/${arg.id}`,
							method: 'delete',
						}),
						invalidatesTags: [TAG_CONVERSATION],
					}),
				})
			},
			overrideExisting: true, // 这个必须加，否则没hook，ref: https://redux-toolkit.js.org/rtk-query/usage/code-splitting
			
		})
	
	return conversationApi
}

