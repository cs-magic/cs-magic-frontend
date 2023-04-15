import baseApi from '@/api/baseApi'
import { IUser, IUserBasic } from '@/ds/user'
import { ID } from '@/ds/general'
import { IUserOpenAI } from '@/ds/openai'

export const userApi = baseApi
	.enhanceEndpoints({
		addTagTypes: ['user'],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			
			listAllUser: build.query<IUser[], void>({
				query: () => `/user`,
			}),
			
			getUser: build.query<IUser, ID>({
				query: (user_id) => `/user/${user_id}`,
				providesTags: (result, error, arg, meta) => [{ type: 'user', id: arg }],
			}),
			
			updateUserBasic: build.mutation<IUserBasic,
				Partial<IUserBasic> & { id: ID } // id 一定要有的
				>({
				query: (data) => ({
					url: `/user/${data.id}/basic`,
					method: 'post',
					body: data,
				}),
				invalidatesTags: (result, error, arg, meta) => [{ type: 'user', id: arg.id }],
			}),
			
			updateUserOpenAI: build.mutation<IUserOpenAI,
				Partial<IUserOpenAI> & { id: ID } // id 一定要有的
				>({
				query: (data) => ({
					url: `/user/${data.id}/openai`,
					method: 'post',
					body: data,
				}),
				invalidatesTags: (result, error, arg, meta) => [{ type: 'user', id: arg.id }],
			}),
		}),
	})


export const {
	useListAllUserQuery,
	useGetUserQuery,
	useUpdateUserBasicMutation,
	useUpdateUserOpenAIMutation,
} = userApi


export default userApi
