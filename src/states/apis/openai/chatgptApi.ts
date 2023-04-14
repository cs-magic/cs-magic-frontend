import baseApi from '@/states/apis/baseApi'
import { ID } from '@/ds/general'
import { ContentType, IChatGPTConversation, IChatMessage, ICreateChatGPTConversation, ICreateConversation, IUserChatgpt, ModelPlatformType } from '@/ds/openai'
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
					url: `/openai/user/${data.id}`,
					method: 'PATCH',
					body: data,
				}),
				invalidatesTags: ['user-chatgpt'],
			}),
			
			//// conversation
			
			listConversations: builder.query<IChatGPTConversation[], { user_id: ID, model_platform: ModelPlatformType }>({
				query: (arg) => `/openai/conversation?user_id=${arg.user_id}&model_platform=${arg.model_platform}`,
				providesTags: ['conversations'],
			}),
			
			// todo: 晚点再兼容
			createConversation: builder.mutation<IChatGPTConversation, ICreateConversation>({
				query: (body) => ({
					url: `/openai/conversation`,
					method: 'post',
					body,
				}),
				invalidatesTags: ['conversations'],
			}),
			
			updateConversation: builder.mutation<IChatGPTConversation, Partial<IChatGPTConversation> & { id: ID }>({
				query: (body) => ({
					url: '/openai/conversation',
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
			listMessages: builder.query<IChatMessage[], ID>({
				query: (conversation_id) => ({
					url: `/openai/conversation/messages`,
					params: { conversation_id },
					method: 'get',
				}),
				providesTags: ['conversation'],
			}),
			
			// todo: unify this
			callOpenAI: builder.mutation<IChatMessage, IChatMessage>({
				query: (body) => ({
					url: `/openai/conversation/chat`,
					method: 'post',
					body,
				}),
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
	
	useCallOpenAIMutation,
} = chatgptApi
