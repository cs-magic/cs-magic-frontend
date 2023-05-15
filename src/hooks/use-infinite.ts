import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { SortingState } from '@tanstack/react-table'
import { IApiListRes } from '@/ds/api'
import { IUser } from '@/ds/user'
import { useLazyGetUserQuery, useLazyListUserIdsQuery, useLazyListUsersQuery } from '@/states/api/userApi'

export const fetchSize = 20


export const useInfinite = ({ sorting }: { sorting: SortingState }) => {
	console.log('useInfinite', { sorting })
	
	const [listUserIds] = useLazyListUserIdsQuery()
	const [listUsers] = useLazyListUsersQuery()
	const [getUser] = useLazyGetUserQuery()
	
	//react-query has an useInfiniteQuery hook just for this situation!
	const { data, fetchNextPage, isFetching, isLoading } =
		useInfiniteQuery<IApiListRes<IUser>>(
			[
				'users',
				sorting, //adding sorting state as key causes table to reset and fetch from new beginning upon sort
			],
			async ({ pageParam = 0 }) => {
				const start = pageParam * fetchSize
				
				const { data, meta } = await listUsers({ skip: start, limit: fetchSize }).unwrap() //pretend api call
				
				// const { data: userIds, meta } = await listUsers({ skip: start, limit: fetchSize }).unwrap() //pretend api call
				// const data = await Promise.all(userIds.map(async (id) => await getUser(id).unwrap()))
				
				return { data, meta }
			},
			{
				getNextPageParam: (_lastGroup, groups) => groups.length,
				keepPreviousData: true,
				refetchOnWindowFocus: false,
			},
		)
	
	//we must flatten the array of arrays from the useInfiniteQuery hook
	const flatData = useMemo(
		() => data?.pages?.flatMap(page => page.data) ?? [],
		[data],
	)
	const total = data?.pages?.[0]?.meta?.total ?? 0
	const fetched = flatData.length
	
	return {
		flatData,
		fetched,
		total,
		isFetching,
		isLoading,
		fetchNextPage,
	}
}
