import { baseApi } from '@/states/api/baseApi'
import { IChatgptConversation, IChatgptConversationCreate, IChatgptMessage } from '@/ds/openai/chatgpt'
import { ID } from '@/ds/general'
import { PlatformType } from '@/ds/openai'

export const TAG_CHATGPT = 'CHATGPT' as const

export const chatgptApi = baseApi
	.enhanceEndpoints({
		addTagTypes: [TAG_CHATGPT],
	})
	.injectEndpoints({
		endpoints: (builder) => ({
			
			listChatgptPrompts: builder.query<IChatgptConversation[], ID | undefined>({
				query: (arg) => ({
					url: `/chatGPT/prompts?` + (arg ? `id=${arg}` : ''),
				}),
			}),
			
			listChatgptMessages: builder.query<IChatgptMessage[], ID>({
				query: (arg) => ({
					url: `/chatGPT/${arg}/messages`,
				}),
			}),
			
			sendMessage: builder.mutation<IChatgptMessage, IChatgptMessage>({
				query: (arg) => ({ url: `/${arg.platform_type}/chat`, method: 'post', body: arg }),
				invalidatesTags: (result, error, arg, meta) => [{ type: TAG_CHATGPT, id: arg.sender }], // todo: socket update ? token update ?
			}),
			
			getConversation: builder.query<IChatgptConversation | null, ID>({
				query: (arg) => `/chatGPT/${arg}`,
			}),
			
			listConversations: builder.query<IChatgptConversation[], { user_id: ID, platform_type: PlatformType.chatGPT }>({
				query: (arg) => ({
					url: `/${arg.platform_type}`,
					params: arg,
				}),
				providesTags: (result, error, arg) => (result ?? []).map((item) => ({ type: TAG_CHATGPT, id: item.id })),
			}),
			
			createConversation: builder.mutation<IChatgptConversation, IChatgptConversationCreate>({
				query: (arg) => ({
					url: `/${arg.platform_type}`,
					method: 'post',
					body: arg,
				}),
				invalidatesTags: [TAG_CHATGPT],
			}),
			
			/**
			 * todo: 其实有时候更新一下conversation并不需要触发listConversation的刷新（可以client端直接更新）
			 */
			updateConversation: builder.mutation<ID, Partial<IChatgptConversation> & { id: ID, platform_type: PlatformType.chatGPT }>({
				query: (arg) => ({
					url: `/${arg.platform_type}`,
					method: 'PATCH',
					body: arg,
				}),
				invalidatesTags: (result, error, arg) => [{ type: TAG_CHATGPT, id: arg.id }],
			}),
			
			deleteConversation: builder.mutation<void, { id: ID, platform_type: PlatformType.chatGPT }>({
				query: (arg) => ({
					url: `/${arg.platform_type}/${arg.id}`,
					method: 'delete',
				}),
				invalidatesTags: [TAG_CHATGPT],
			}),
			
		}),
	})


export const {
	useListChatgptPromptsQuery,
	useListChatgptMessagesQuery,
	useSendMessageMutation,
	useUpdateConversationMutation,
	useDeleteConversationMutation,
	useCreateConversationMutation,
	useListConversationsQuery,
	useLazyListChatgptMessagesQuery,
	useLazyListChatgptPromptsQuery,
	useLazyListConversationsQuery,
	useGetConversationQuery,
	useLazyGetConversationQuery,
} = chatgptApi
