import { BACKEND_ENDPOINT } from '@/lib/env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' // 要从react内导入，否则没hook，ref: https://redux-toolkit.js.org/rtk-query/usage/code-splitting

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: BACKEND_ENDPOINT,
	}),
	reducerPath: 'baseApi',
	endpoints: (builder) => ({
		uploadFile: builder.mutation<string, File>({
			query: (file) => {
				const formData = new FormData()
				formData.append('file', file)
				return {
					url: `/file`,
					method: 'post',
					body: formData,
				}
			},
		}),
	}),
})

export default baseApi

export const {
	useUploadFileMutation,
} = baseApi
