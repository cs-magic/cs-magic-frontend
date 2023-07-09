import { createAppAsyncThunk } from '@/states/thunks/index'
import { setLangContent, setLangType } from '@/states/features/i18nSlice'
import { asyncLoadLang } from '@/config/i18n/utils'
import { LangType } from '@/config/i18n/langs'

export const asyncSetLang = createAppAsyncThunk('asyncSetLang', async (lang: LangType, { dispatch }) => {
	dispatch(setLangType(lang))
	const langContent = await asyncLoadLang(lang)
	dispatch(setLangContent(langContent))
})
