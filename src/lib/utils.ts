import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ID } from '@/ds/general'
import { PlatformType } from '@/ds/openai/general'
import { II18nSchema } from '@/config/i18n/schema'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}


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

export const getChatUrl = (data: { id?: ID, platform_type: PlatformType }): string => {
	const baseUrl = `/apps/chat/${data.platform_type}/`
	return data.id ? baseUrl + data.id : baseUrl
}


export const generateVerificationToken = async (): Promise<string> =>
	Array.from(Array(4)).map(() => Math.floor(Math.random() * 10)).join('')
