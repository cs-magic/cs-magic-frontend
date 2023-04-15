import baseApi from '@/api/baseApi'

export const RTK_TAG_DALLE = 'RTK_TAG_DALLE'

export interface IDalleReq {
	prompt: string
	n?: number
	w?: number
	h?: number
}

export const dalleApi = baseApi
	// ref: https://github.com/reduxjs/redux-toolkit/issues/1510#issuecomment-1122564975
	.enhanceEndpoints({
		addTagTypes: [RTK_TAG_DALLE],
	})
	
	.injectEndpoints({
		endpoints: (builder) => ({
			
			askDalle: builder.query<string, IDalleReq>({
				query: (data) => ({
					url: `/openai/message/dalle`,
					method: 'post',
					data,
				}),
				providesTags: [RTK_TAG_DALLE],
			}),
			
		}),
		overrideExisting: false, // 这个必须加，否则没hook，ref: https://redux-toolkit.js.org/rtk-query/usage/code-splitting
	})

export default dalleApi


export const {
	useAskDalleQuery,
} = dalleApi
