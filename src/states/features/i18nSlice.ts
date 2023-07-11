import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { II18nSchema } from '@/config/i18n/schema'
import { RootState } from '@/states/store'
import { zhCn } from '@/config/i18n/langs/zh-cn'
import { LangType } from '@/config/i18n/langs'


export interface II18nSlice {
	lang: LangType
	u: II18nSchema
}

const initialState: II18nSlice = {
	lang: 'zh-cn',
	u: zhCn,
}

export const i18nSlice = createSlice({
	name: 'i18n',
	initialState,
	reducers: {
		setLangType: (state, action: PayloadAction<LangType>) => {
			state.lang = action.payload
		},
		setLangContent: (state, action: PayloadAction<II18nSchema>) => {
			state.u = action.payload
		},
	},
})

export const { setLangType, setLangContent } = i18nSlice.actions
export const selectLang = (state: RootState) => state.i18n.lang
export const selectU = (state: RootState) => state.i18n.u
