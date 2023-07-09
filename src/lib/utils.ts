import { ID } from '@/ds/general'
import { PlatformType } from '@/ds/openai/general'
import { II18nSchema } from '@/config/i18n/schema'
import { IMessageParams } from '@/ds/openai/message'
import { IConversationParams } from '@/ds/openai/conversation'
import { ChatgptModelType, ChatgptRoleType } from '@/ds/openai/chatgpt'
import { DalleDimensionType } from '@/ds/openai/dalle'
import axios from 'axios'


export const ensureSole = (s: string | string[] | undefined): string | null =>
	Array.isArray(s) ? s[0] : s || null


export const getTitle = (s?: string, full?: boolean, u?: II18nSchema): string => {
	const website = u?.display.website
	const prefix = full && website ? website.platformName : ''
	const suffix = s
	if (prefix && suffix) return [prefix, suffix].join(' | ')
	else if (suffix) return suffix
	else return prefix
}

export const getChatLink = (data: { id?: ID, platform_type: PlatformType }): string => {
	const baseUrl = `/apps/chat/${data.platform_type}/`
	return data.id ? baseUrl + data.id : baseUrl
}


export const getUserLink = (userId: string) => `/user/${userId}`

export const initConversationParams = <T extends PlatformType>(platform_type: T): IConversationParams<T> => (
	platform_type === PlatformType.chatGPT
		? {
			model: ChatgptModelType.gpt35,
			selected: [],
		} as IConversationParams<PlatformType.chatGPT>
		: {} as IConversationParams<PlatformType.dalle>
) as IConversationParams<T>

export const initMessageParams = <T extends PlatformType>(platform_type: T): IMessageParams<T> => (
	platform_type === PlatformType.chatGPT
		? {
			role: ChatgptRoleType.user,
		} as IMessageParams<PlatformType.chatGPT>
		: {
			role: ChatgptRoleType.user,
			dimension: DalleDimensionType.sm,
		} as IMessageParams<PlatformType.dalle>
) as IMessageParams<T>

export const getToken = async (email: string): Promise<string> =>
	(await axios.get('/api/auth/token?email=' + email)).data.toString()
