import { LangType } from '@/ds/general'
import { createAppAsyncThunk } from '@/states/thunks/index'
import { setLangContent, setLangType } from '@/states/features/i18nSlice'
import { asyncLoadLang } from '@/config/i18n/utils'

export const asyncSetLang = createAppAsyncThunk('asyncSetLang', async (lang: LangType, { dispatch }) => {
	dispatch(setLangType(lang))
	const langContent = await asyncLoadLang(lang)
	dispatch(setLangContent(langContent))
})
