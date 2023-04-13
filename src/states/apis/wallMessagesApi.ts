import baseApi from '@/states/apis/baseApi'
import { IWallMessage, IWallMessageCreate, IWallMessageVote } from '@/ds/wall-messages'

export const wallMessagesApi = baseApi
	.enhanceEndpoints({
		addTagTypes: ['wall-messages'],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			listWallMessages: build.query<IWallMessage[], void>({
				query: () => `/wall-messages/`,
				providesTags: ['wall-messages'],
			}),
			
			createWallMessage: build.mutation<void, IWallMessageCreate>({
				query: (data) => ({
					url: '/wall-messages/',
					method: 'post',
					body: data,
				}),
				invalidatesTags: ['wall-messages'],
			}),
			
			voteWallMessage: build.mutation<void, IWallMessageVote>({
				query: (params) => ({
					url: '/wall-messages/vote/',
					method: 'post',
					params,
				}),
				invalidatesTags: ['wall-messages'],
			}),
			
		}),
	})


export const {
	useListWallMessagesQuery,
	useCreateWallMessageMutation,
	useVoteWallMessageMutation
} = wallMessagesApi


export default wallMessagesApi
