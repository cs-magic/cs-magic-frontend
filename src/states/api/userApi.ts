import { IUser, IUserBasic, IUserOpenAI } from '@/ds/user'
import { ID } from '@/ds/general'
import { baseApi } from '@/states/api/baseApi'

export const TAG_USER = 'user' as const

export const ALL = '*' as const

export const userApi = baseApi
	.enhanceEndpoints({
		addTagTypes: [TAG_USER],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			
			listAllUser: build.query<IUser[], void>({
				query: () => `/user`,
				// 直接用 tag 应该不行，要生成独立的，否则 mutate 后 query 会被 reject：`Aborted due to condition callback returning false.`
				providesTags: (result) => [
					{ type: TAG_USER, id: ALL },
					...(result || []).map((user) => ({ type: TAG_USER, id: user.id })),
				],
			}),
			
			getUser: build.query<IUser, ID>({
				query: (arg) => `/user/${arg}`,
				providesTags: (result, error, arg, meta) => [{ type: TAG_USER, id: arg }],
			}),
			
			updateBasicUser: build.mutation<IUserBasic,
				{
					body: Partial<IUserBasic>, id: ID
				} // id 一定要有的
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
	useLazyGetUserQuery,
	useUpdateBasicUserMutation,
	useUpdateOpenAIUserMutation,
} = userApi
