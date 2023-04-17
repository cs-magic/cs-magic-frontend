import { IUser, IUserBasic, IUserOpenAI } from '@/ds/user'
import { ID } from '@/ds/general'
import { baseApi } from '@/api/baseApi'

export const TAG_USER = 'user'

export const userApi = baseApi
	.enhanceEndpoints({
		addTagTypes: [TAG_USER],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			
			listAllUser: build.query<IUser[], void>({
				query: () => `/user`,
				providesTags: [TAG_USER],
			}),
			
			getUser: build.query<IUser, ID>({
				query: (arg) => `/user/${arg}`,
				providesTags: (result, error, arg, meta) => [{ type: TAG_USER, id: arg }],
			}),
			
			updateBasicUser: build.mutation<IUserBasic,
				{ body: Partial<IUserBasic>, id: ID } // id 一定要有的
				>({
				query: (arg) => ({
					url: `/user/${arg.id}/basic`,
					method: 'PATCH',
					body: arg.body,
				}),
				invalidatesTags: (result, error, arg, meta) => [{ type: TAG_USER, id: arg.id }],
			}),
			
			updateOpenAIUser: build.mutation<IUserOpenAI,
				{ body: Partial<IUserOpenAI>, id: ID } // id 一定要有的
				>({
				query: (arg) => ({
					url: `/user/${arg.id}/openai`,
					method: 'PATCH',
					body: arg.body,
				}),
				invalidatesTags: (result, error, arg, meta) => [{ type: TAG_USER, id: arg.id }],
			}),
			
			// 暂时不提供删除用户的api
		}),
	})


export const {
	useListAllUserQuery,
	useGetUserQuery,
	useUpdateBasicUserMutation,
	useUpdateOpenAIUserMutation,
} = userApi
