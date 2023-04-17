import { IConversation, ICreateConversation } from '@/ds/openai/conversation'
import { ID } from '@/ds/general'
import { baseApi } from '@/api/baseApi'
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
						query: (arg) => `/${arg.platform_type}?user_id=${arg.user_id}&platform=${arg.platform_type}`,
						providesTags: (result, error, arg) => [{ type: TAG_CONVERSATION, id: arg.user_id }],
					}),
					
					createConversation: builder.mutation<ID, ICreateConversation<T>>({
						query: (arg) => ({
							url: `/${arg.platform_type}`,
							method: 'PATCH',
							body: arg,
						}),
						invalidatesTags: [TAG_CONVERSATION],
					}),
					
					updateConversation: builder.mutation<ID, Partial<IConversation<T>> & { id: ID, platform_type: T }>({
						query: (arg) => ({
							url: `/${arg.platform_type}/${arg.id}`,
							method: 'PATCH',
							body: arg,
						}),
						invalidatesTags: (result, error, arg) => [{ type: TAG_CONVERSATION, id: arg.id }],
					}),
					
					deleteConversation: builder.mutation<void, { id: ID, platform_type: T }>({
						query: (arg) => ({
							url: `/${arg.platform_type}/${arg}`,
							method: 'delete',
						}),
						invalidatesTags: [TAG_CONVERSATION],
					}),
				})
			},
			overrideExisting: false, // 这个必须加，否则没hook，ref: https://redux-toolkit.js.org/rtk-query/usage/code-splitting
			
		})
	
	return conversationApi
}

