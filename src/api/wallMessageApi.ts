import { IWallMessage, IWallMessageCreate, IWallMessageVote } from '@/ds/wall-messages'
import { baseApi } from '@/api/baseApi'

export const TAG_WALL_MESSAGE = 'wall-message'

export const wallMessageApi = baseApi
	.enhanceEndpoints({
		addTagTypes: [TAG_WALL_MESSAGE],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			listWallMessages: build.query<IWallMessage[], void>({
				query: () => `/wall-messages`,
				providesTags: [TAG_WALL_MESSAGE],
			}),
			
			createWallMessage: build.mutation<void, IWallMessageCreate>({
				query: (data) => ({
					url: '/wall-messages',
					method: 'post',
					body: data,
				}),
				invalidatesTags: [TAG_WALL_MESSAGE],
			}),
			
			voteWallMessage: build.mutation<void, IWallMessageVote>({
				query: (params) => ({
					url: '/wall-messages/vote',
					method: 'post',
					params,
				}),
				invalidatesTags: [TAG_WALL_MESSAGE],
			}),
			
		}),
	})


export const {
	useListWallMessagesQuery,
	useCreateWallMessageMutation,
	useVoteWallMessageMutation,
} = wallMessageApi

