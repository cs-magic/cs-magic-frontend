import baseApi from '@/states/apis/baseApi'
import { ID } from '@/ds/general'
import { IChatMessageReq, IChatMessageRes } from '@/ds/message'
import { IChatgptConversation, IChatgptCreateUserConversation, IChatgptUserConversation } from '@/ds/chatgpt'
import { IUserChatgpt } from '@/ds/chatgpt_v2'

export const RTK_TAG_CHATGPT_CONVERSATION = 'chatgpt'

export const chatgptApi = baseApi
	// ref: https://github.com/reduxjs/redux-toolkit/issues/1510#issuecomment-1122564975
	.enhanceEndpoints({
		addTagTypes: [RTK_TAG_CHATGPT_CONVERSATION],
	})
	
	.injectEndpoints({
		endpoints: (builder) => ({
			
			//// token
			getUserChatGPT: builder.query<IUserChatgpt, ID>({
				query: (user_id) => `/openai/user/${user_id}`,
				providesTags: (result, error, arg, meta) => [{ type: RTK_TAG_CHATGPT_CONVERSATION, id: arg }],
			}),
			
			//// conversation
			
			listConversations: builder.query<IChatgptConversation[], ID>({
				query: (user_id) => `/openai/conversation/?user_id=${user_id}`,
				providesTags: [RTK_TAG_CHATGPT_CONVERSATION],
			}),
			
			createConversation: builder.mutation<IChatgptConversation, IChatgptCreateUserConversation>({
				query: (params) => ({
					url: `/openai/conversation/create`,
					method: 'post',
					params,
				}),
				invalidatesTags: [RTK_TAG_CHATGPT_CONVERSATION],
			}),
			
			updateConversation: builder.mutation<IChatgptConversation, Partial<IChatgptConversation> & { id: ID }>({
				query: (data) => ({
					url: '/openai/conversation',
					method: 'PATCH',
					body: data,
				}),
				// todo: only update the specific item with id
				invalidatesTags: [RTK_TAG_CHATGPT_CONVERSATION],
			}),
			
			deleteConversation: builder.mutation<void, IChatgptUserConversation>({
				query: (params) => ({
					url: '/openai/conversation/',
					method: 'delete',
					params,
				}),
				invalidatesTags: [RTK_TAG_CHATGPT_CONVERSATION],
			}),
			
			//// message
			listMessages: builder.query<IChatMessageRes[], ID>({
				query: (conversation_id) => ({
					url: `/v1/openai/conversation/messages`,
					params: {conversation_id},
					method: 'get'
				})
			}),
			
			askChatGPT: builder.mutation<IChatMessageRes, IChatMessageReq>({
				query: (data) => ({
					url: `/openai/message/chatgpt/`,
					method: 'post',
					data,
				}),
				invalidatesTags: (result, error, arg, meta) => [{ type: RTK_TAG_CHATGPT_CONVERSATION, user_id: arg.user_id }],
				// 实时聊天就不要一直重置刷新了，主要是涉及到了客户端和服务端双层的信息
			}),
		}),
		overrideExisting: false, // 这个必须加，否则没hook，ref: https://redux-toolkit.js.org/rtk-query/usage/code-splitting
	})

export default chatgptApi


export const {
	
	useListConversationsQuery,
	useCreateConversationMutation,
	useUpdateConversationMutation,
	useDeleteConversationMutation,
	
	useListMessagesQuery,
	
	useGetUserChatGPTQuery,
	useAskChatGPTMutation,
} = chatgptApi
