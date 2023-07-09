import { II18nSchema } from '@/config/i18n/schema'
import { LangType } from '@/config/i18n/langs'

export const asyncLoadLang = async (s: LangType): Promise<II18nSchema> => {
	const langContent = await import(`./langs/${s}.ts`)
	console.log({ langContent })
	return langContent.default
}
