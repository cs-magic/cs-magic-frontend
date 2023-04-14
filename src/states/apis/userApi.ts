import baseApi from '@/states/apis/baseApi'
import { IUserBasic } from '@/ds/user'
import { ID } from '@/ds/general'

export const userApi = baseApi
	.enhanceEndpoints({
		addTagTypes: ['user'],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			
			getUserBasic: build.query<IUserBasic, ID>({
				query: (user_id) => `/user/${user_id}`,
				providesTags: (result, error, arg, meta) => [{ type: 'user', id: arg }],
			}),
			
			updateUserBasic: build.mutation<IUserBasic,
				Partial<IUserBasic> & { id: ID } // id 一定要有的
				>({
				query: (data) => ({
					url: `/user/${data.id}`,
					method: 'PATCH',
					body: data,
				}),
				invalidatesTags: (result, error, arg, meta) => [{ type: 'user', id: arg.id }],
			}),
			
		}),
	})


export const {
	useGetUserBasicQuery,
	useUpdateUserBasicMutation,
} = userApi


export default userApi
