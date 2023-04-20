import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { II18nSchema } from '@/config/i18n/schema'
import { zh } from '@/config/i18n/langs/zh'
import { en } from '@/config/i18n/langs/en'
import { RootState } from '@/states/store'

export type LangType = 'zh' | 'en'


export interface II18nSlice {
	lang: LangType
	u: II18nSchema
}

const initialState: II18nSlice = {
	lang: 'zh',
	u: zh,
}

export const i18nSlice = createSlice({
	name: 'i18n',
	initialState,
	reducers: {
		setLang: (state, action: PayloadAction<LangType>) => {
			state.lang = action.payload
			if (action.payload === 'zh') {
				state.u = zh
			} else {
				state.u = en
			}
		},
	},
})

export const { setLang } = i18nSlice.actions
export const selectLang = (state: RootState) => state.i18n.lang
export const selectU = (state: RootState) => state.i18n.u
