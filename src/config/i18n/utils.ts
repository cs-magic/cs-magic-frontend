import { II18nSchema } from '@/config/i18n/schema'
import { LangType } from '@/ds/general'

export const asyncLoadLang = async (s: LangType): Promise<II18nSchema> => {
	const langContent = await import(`./langs/${s}.ts`)
	console.log({ langContent })
	return langContent.default
}
