import { baseApi } from '@/states/api/baseApi'
import { IChatgptPromptWeb } from '@/ds/openai/chatgpt'
import { ID } from '@/ds/general'
import { IChatgptMessage } from '@/ds/openai/message'

export const TAG_CHATGPT = 'CHATGPT' as const

export const chatgptApi = baseApi
	.enhanceEndpoints({
		addTagTypes: [TAG_CHATGPT],
	})
	.injectEndpoints({
		endpoints: (builder) => ({
			
			listChatgptPrompts: builder.query<IChatgptPromptWeb[], ID | undefined>({
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
				query: (arg) => ({ url: `/${arg.platform_type}/${arg.conversation_id}/chat`, method: 'post', body: arg }),
				invalidatesTags: (result, error, arg, meta) => [{ type: TAG_CHATGPT, id: arg.sender }], // todo: socket update ? token update ?
			}),
		}),
	})


export const {
	useListChatgptPromptsQuery,
	useListChatgptMessagesQuery,
	useSendMessageMutation,
} = chatgptApi
