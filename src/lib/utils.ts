import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { u } from '@/config'
import { ID } from '@/ds/general'
import { ModelPlatformType } from '@/ds/message'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}


export const ensureSole = (s: string | string[] | null): string | null =>
	Array.isArray(s) ? s[0] : s


export const getTitle = (s?: string, full?: boolean): string => {
	const prefix = full ? u.website.platformName : ''
	const suffix = s
	if (prefix && suffix) return [prefix, suffix].join(' | ')
	else if (suffix) return suffix
	else return prefix
}

export const getChatUrl = (data: { id?: ID, model_platform: ModelPlatformType }): string => {
	const baseUrl = `/apps/${data.model_platform}/`
	return data ? baseUrl + data.id : data
}
