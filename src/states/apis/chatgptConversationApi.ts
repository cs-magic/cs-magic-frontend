import baseApi from '@/states/apis/baseApi'
import { ID } from '@/ds/general'
import { IChatgptConversation, IChatgptCreateUserConversation, IChatgptUserConversation } from '@/ds/chatgpt'

export const RTK_TAG_CHATGPT_CONVERSATION = 'RTK_TAG_CHATGPT_CONVERSATION'

export const chatgptConversationApi = baseApi
	// ref: https://github.com/reduxjs/redux-toolkit/issues/1510#issuecomment-1122564975
	.enhanceEndpoints({
		addTagTypes: [RTK_TAG_CHATGPT_CONVERSATION],
	})
	
	.injectEndpoints({
		endpoints: (builder) => ({
			
			listConversations: builder.query<IChatgptConversation[], ID>({
				query: (user_id) => `/chatgpt/conversation/list?user_id=${user_id}`,
				providesTags: [RTK_TAG_CHATGPT_CONVERSATION],
			}),
			
			createConversation: builder.mutation<void, IChatgptCreateUserConversation>({
				query: (params) => ({
					url: `/chatgpt/conversation/create`,
					method: 'post',
					params,
				}),
				invalidatesTags: [RTK_TAG_CHATGPT_CONVERSATION],
			}),
			
			updateConversation: builder.mutation<IChatgptConversation, Partial<IChatgptConversation> & {id: ID}>({
				query: (data) => ({
					url: '/chatgpt/conversation',
					method: 'PATCH',
					body: data,
				}),
				// todo: only update the specific item with id
				invalidatesTags: [RTK_TAG_CHATGPT_CONVERSATION],
			}),
			
			deleteConversation: builder.mutation<void, IChatgptUserConversation>({
				query: (params) => ({
					url: '/chatgpt/conversation/',
					method: 'delete',
					params,
				}),
				invalidatesTags: [RTK_TAG_CHATGPT_CONVERSATION],
			}),
		}),
		overrideExisting: false, // 这个必须加，否则没hook，ref: https://redux-toolkit.js.org/rtk-query/usage/code-splitting
	})

export default chatgptConversationApi


export const {
	useListConversationsQuery,
	useUpdateConversationMutation,
	useDeleteConversationMutation,
} = chatgptConversationApi
