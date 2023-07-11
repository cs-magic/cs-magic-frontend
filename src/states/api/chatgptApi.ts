import { baseApi } from '@/states/api/baseApi'
import { IChatgptPromptWeb } from '@/ds/openai/chatgpt'
import { ID } from '@/ds/general'

export const TAG_CHATGPT = 'CHATGPT' as const

export const chatgptApi = baseApi
	.enhanceEndpoints({
		addTagTypes: [TAG_CHATGPT],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			
			listChatgptPrompts: build.query<IChatgptPromptWeb[], ID | undefined>({
				query: (arg) => ({
					url: `/chatGPT/prompts?` + (arg ? `id=${arg}` : ''),
				}),
			}),
		}),
	})


export const {
	useListChatgptPromptsQuery,
} = chatgptApi
