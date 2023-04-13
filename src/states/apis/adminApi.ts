import baseApi from '@/states/apis/baseApi'
import { UserState } from '@/ds/user'

export const adminApi = baseApi
	.enhanceEndpoints({
		addTagTypes: ['admin'],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			
			listUserStates: build.query<UserState[], void>({
				query: () => `/admin/users/`,
			}),
			
		}),
	})


export const {
	useListUserStatesQuery,
} = adminApi


export default adminApi
