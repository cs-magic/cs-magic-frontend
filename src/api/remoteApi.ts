import { baseApi } from '@/api/baseApi'

export const remoteApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getVersionsHistory: build.query<string, undefined>({
			query: () => `/remote/version_history`,
		}),
	}),
	overrideExisting: true,
})

export const {
	useLazyGetVersionsHistoryQuery,
	useGetVersionsHistoryQuery,
} = remoteApi
