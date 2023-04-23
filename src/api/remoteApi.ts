import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const remoteApi = createApi({
	baseQuery: fetchBaseQuery(),
	endpoints: (build) => ({
		getVersionsHistory: build.query<string, void>({
			query: () => ({
				url: `https://raw.githubusercontent.com/cs-magic/cs-magic-frontend/main/versions.md`,
				responseHandler: (response) => response.text(), // ref: https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#parsing-a-response
			}),
		}),
	}),
})

export const {
	useGetVersionsHistoryQuery,
} = remoteApi
