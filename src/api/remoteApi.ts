import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const remoteApi = createApi({
	baseQuery: fetchBaseQuery(),
	endpoints: (build) => ({
		getVersionsHistory: build.query<string, void>({
			query: () => `https://raw.githubusercontent.com/cs-magic/cs-magic-frontend/main/versions.md`
		})
	})
})

export const {
	useGetVersionsHistoryQuery
} = remoteApi
