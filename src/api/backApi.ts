import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBridge } from '@/ds/general'

export const backApi = createApi({
	baseQuery: fetchBaseQuery(
	),
	endpoints: (build) => ({
		getWechatQrcode: build.query<IBridge, string | undefined>({
			query: (wxid) => `/api/wechaty?wxid=${wxid}`,
		}),
	}),
})

export const {
	useGetWechatQrcodeQuery,
} = backApi
