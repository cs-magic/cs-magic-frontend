import { BACKEND_ENDPOINT } from '@/lib/env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' // 要从react内导入，否则没hook，ref: https://redux-toolkit.js.org/rtk-query/usage/code-splitting

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: BACKEND_ENDPOINT,
		credentials: 'include', // ref: https://github.com/reduxjs/redux-toolkit/issues/2095
		
	}),
	reducerPath: 'baseApi',
	// refetchOnMountOrArgChange: true, // ref: https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#encouraging-re-fetching-with-refetchonmountorargchange
	
	endpoints: () => ({}),
})

export const {} = baseApi
