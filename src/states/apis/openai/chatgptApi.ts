import baseApi from '@/states/apis/baseApi'
import { ID } from '@/ds/general'
import { IChatMessageReq, IChatMessageRes } from '@/ds/message'
import { IChatgptConversation, IChatgptCreateUserConversation } from '@/ds/chatgpt'
import { IUserChatgpt } from '@/ds/chatgpt_v2'
import { IUserBasic } from '@/ds/user'


export const chatgptApi = baseApi
	// ref: https://github.com/reduxjs/redux-toolkit/issues/1510#issuecomment-1122564975
	.enhanceEndpoints({
		addTagTypes: ['user-chatgpt', 'conversations', 'conversation'],
	})
	
	.injectEndpoints({
		endpoints: (builder) => ({
			
			//// user-chatgpt (especially token relative)
			getUserChatGPT: builder.query<IUserChatgpt, ID>({
				query: (user_id) => `/openai/user/${user_id}`,
				providesTags: ['user-chatgpt'],
			}),
			
			updateUserChatGPT: builder.mutation<IUserBasic,
				Partial<IUserChatgpt> & { id: ID } // id 一定要有的
				>({
				query: (data) => ({
					url: `/openai/user/`,
					method: 'PATCH',
					body: data,
				}),
				invalidatesTags: ['user-chatgpt'],
			}),
			
			//// conversation
			
			listConversations: builder.query<IChatgptConversation[], ID>({
				query: (user_id) => `/openai/conversation/?user_id=${user_id}`,
				providesTags: ['conversations'],
			}),
			
			createConversation: builder.mutation<IChatgptConversation, IChatgptCreateUserConversation>({
				query: (body) => ({
					url: `/openai/conversation/`,
					method: 'post',
					body,
				}),
				invalidatesTags: ['conversations'],
			}),
			
			updateConversation: builder.mutation<IChatgptConversation, Partial<IChatgptConversation> & { id: ID }>({
				query: (body) => ({
					url: '/openai/conversation/',
					method: 'PATCH',
					body,
				}),
				// todo: only update the specific item with id
				invalidatesTags: ['conversations'],
			}),
			
			deleteConversation: builder.mutation<void, ID>({
				query: (conversation_id) => ({
					url: `/openai/conversation/${conversation_id}`,
					method: 'delete',
				}),
				invalidatesTags: ['conversations'],
			}),
			
			//// message
			listMessages: builder.query<IChatMessageRes[], ID>({
				query: (conversation_id) => ({
					url: `/openai/conversation/messages`,
					params: { conversation_id },
					method: 'get',
				}),
			}),
			
			askChatGPT: builder.mutation<IChatMessageRes, IChatMessageReq>({
				query: (body) => ({
					url: `/openai/conversation/chat/chatgpt`,
					method: 'post',
					body,
				}),
				invalidatesTags: (result, error, arg, meta) => [{ type: 'conversation', user_id: arg.user_id }],
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
	useUpdateUserChatGPTMutation,
	
	useAskChatGPTMutation,
} = chatgptApi
