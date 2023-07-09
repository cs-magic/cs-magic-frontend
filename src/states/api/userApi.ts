import { IUser, IUserBasic, IUserOpenAI } from '@/ds/user'
import { ID, TAG_ALL, TAG_USER } from '@/ds/general'
import { baseApi } from '@/states/api/baseApi'
import { IApiListRes, IQuery } from '@/ds/api'

export const userApi = baseApi
	.enhanceEndpoints({
		addTagTypes: [TAG_USER],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			
			listUserIds: build.query<IApiListRes<ID>, IQuery>({
				query: (arg) => ({
					url: `/user/`,
					params: arg,
				}),
				// 直接用 tag 应该不行，要生成独立的，否则 mutate 后 query 会被 reject：`Aborted due to condition callback returning false.`
				providesTags: (result) => [
					{ type: TAG_USER, id: TAG_ALL },
					// 不需要更新每个user
					// ...(result?.data || []).map((user) => ({ type: TAG_USER, id: user })),
				],
			}),
			
			listUsers: build.query<IApiListRes<IUser>, IQuery>({
				query: (arg) => ({
					url: `/user/all`,
					params: arg,
				}),
				// 直接用 tag 应该不行，要生成独立的，否则 mutate 后 query 会被 reject：`Aborted due to condition callback returning false.`
				providesTags: (result) => [
					{ type: TAG_USER, id: TAG_ALL },
					// 不需要更新每个user
					// ...(result?.data || []).map((user) => ({ type: TAG_USER, id: user })),
				],
			}),
			
			
			getUser: build.query<IUser, ID>({
				query: (arg) => `/user/${arg}`,
				transformResponse: (response: IUserBasic & { id: ID }): IUser => ({
					id: response.id,
					basic: response,
					// todo: openai
					openai: {
						balance: 0,
						cnt: 0,
						consumption: 0,
					},
				}),
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
	useListUserIdsQuery,
	useLazyListUserIdsQuery,
	useListUsersQuery,
	useLazyListUsersQuery,
	useGetUserQuery,
	useLazyGetUserQuery,
	useUpdateBasicUserMutation,
	useUpdateOpenAIUserMutation,
} = userApi
