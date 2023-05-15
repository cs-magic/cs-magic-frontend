import { RootLayout } from '@/components/layouts/RootLayout'
import { useAdmin } from '@/hooks/use-user'
import { useU } from '@/hooks/use-u'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useUserColumns } from '@/hooks/use-user-columns'
import { flexRender, getCoreRowModel, getSortedRowModel, Row, SortingState, useReactTable } from '@tanstack/react-table'
import { useInfinite } from '@/hooks/use-infinite'
import { useVirtual } from 'react-virtual'
import { IUser } from '@/ds/user'
import { clsx } from 'clsx'
import { Loading } from '@/components/general/CentralLoadingComp'


export const AdminPage = () => {
	const u = useU()
	const isAdmin = useAdmin()
	
	const ref = useRef<HTMLDivElement>(null)
	
	const [sorting, setSorting] = useState<SortingState>([])
	
	const { flatData, total, isLoading, isFetching, fetched, fetchNextPage } = useInfinite({ sorting })
	
	const columns = useUserColumns()
	const table = useReactTable({
		data: flatData,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true,
	})
	
	const { rows } = table.getRowModel()
	
	//Virtualizing is optional, but might be necessary if we are going to potentially have hundreds or thousands of rows
	const { virtualItems: virtualRows, totalSize } = useVirtual({
		parentRef: ref,
		size: rows.length,
		overscan: 10,
	})
	
	const PaddingTop = () => {
		const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
		
		return paddingTop > 0 ? (
			<tr>
				<td style={{ height: `${paddingTop}px` }}/>
			</tr>
		) : <></>
	}
	
	
	const PaddingBottom = () => {
		const paddingBottom =
			virtualRows.length > 0
				? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
				: 0
		
		return paddingBottom > 0 ? (
			<tr>
				<td style={{ height: `${paddingBottom}px` }}/>
			</tr>
		) : <></>
	}
	
	//called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
	const fetchMoreOnBottomReached = useCallback(
		(containerRefElement?: HTMLDivElement | null) => {
			if (containerRefElement) {
				const { scrollHeight, scrollTop, clientHeight } = containerRefElement
				//once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
				if (
					scrollHeight - scrollTop - clientHeight < 300 &&
					!isFetching &&
					fetched < total
				) {
					fetchNextPage()
				}
			}
		},
		[fetchNextPage, isFetching, fetched, total],
	)
	
	//a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
	useEffect(() => {
		fetchMoreOnBottomReached(ref.current)
	}, [fetchMoreOnBottomReached])
	
	return (
		<RootLayout title={u.routers.admin.console}>
			<div
				className={clsx(
					'max-h-[900px]', // important
					'w-full h-[700px]  overflow-auto',
				)}
				onScroll={(event) => fetchMoreOnBottomReached(event.target as HTMLDivElement)}
				ref={ref}
			>
				
				<table className={'w-full border border-collapse border-spacing-2'}>
					<thead className={'sticky top-0'}>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
									{header.isPlaceholder ? null : (
										<div
											{...{
												className: header.column.getCanSort()
													? 'cursor-pointer select-none'
													: '',
												onClick: header.column.getToggleSortingHandler(),
											}}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
											{{
												asc: ' 🔼',
												desc: ' 🔽',
											}[header.column.getIsSorted() as string] ?? null}
										</div>
									)}
								</th>
							))}
						</tr>
					))}
					</thead>
					
					<tbody>
					
					<PaddingTop/>
					
					{virtualRows.map((virtualRow) => {
						const row = rows[virtualRow.index] as Row<IUser>
						return (
							<tr key={row.id}>
								{
									row.getVisibleCells().map(cell => (
										<td key={cell.id} className={'border border-slate-100 dark:border-slate-900 p-1'}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									))}
							</tr>
						)
					})}
					
					<PaddingBottom/>
					</tbody>
					
					<tfoot>
					{table.getFooterGroups().map(footerGroup => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map(header => (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.footer,
											header.getContext(),
										)}
								</th>
							))}
						</tr>
					))}
					</tfoot>
				</table>
			
			</div>
			
			<div>
				<span>total: {total}</span>
				<span className={'inline-flex gap-2'}>
					, fetched: {isFetching ? <Loading/> : fetched}
				</span>
			</div>
		</RootLayout>
	)
}

export default AdminPage


