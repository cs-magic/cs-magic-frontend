import { baseApi } from '@/states/api/baseApi'

export const remoteApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getVersionsHistory: build.query<string, undefined>({
			query: () => ({
				url: `/remote/version_history`,
				// responseHandler: (response) => response.text(), // ref: https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#parsing-a-response
			}),
		}),
	}),
	overrideExisting: true,
})

export const {
	useLazyGetVersionsHistoryQuery,
	useGetVersionsHistoryQuery,
} = remoteApi
