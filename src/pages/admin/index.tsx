import { RootLayout } from '@/components/layouts/RootLayout'
import { useAdmin } from '@/hooks/use-user'
import { useLazyGetUserQuery, useListUserIdsQuery } from '@/states/api/userApi'
import { useU } from '@/hooks/use-u'
import React, { useEffect, useState } from 'react'
import { useUserColumns } from '@/hooks/use-user-columns'
import { IUser } from '@/ds/user'
import { ID } from '@/ds/general'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'


export const AdminPage = () => {
	const u = useU()
	const isAdmin = useAdmin()
	
	const limit = 10
	const [skip, setSkip] = useState(0)
	const { data: apiGetUserIds } = useListUserIdsQuery({ limit, skip })
	const total = apiGetUserIds?.meta.total
	
	const [getUser] = useLazyGetUserQuery()
	const [usersData, setUsersData] = useState<IUser[]>([])
	
	const columns = useUserColumns()
	const table = useReactTable({
		data: usersData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})
	
	useEffect(() => {
		console.log('apiGetUserIds: ', apiGetUserIds)
		const usersId2data = async (ids: ID[]) => {
			const data = await Promise.all(ids.map(async (id) => await getUser(id).unwrap()))
			setUsersData(data)
		}
		usersId2data((apiGetUserIds?.data || []))
	}, [apiGetUserIds])
	
	return (
		<RootLayout title={u.routers.admin.console}>
			
			<table className={'border border-collapse border-spacing-2'}>
				<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<th key={header.id} colSpan={header.colSpan}>
								{header.isPlaceholder
									? null
									: flexRender(header.column.columnDef.header, header.getContext())
								}
							</th>
						))}
					</tr>
				))}
				</thead>
				
				<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{
							row.getVisibleCells().map(cell => (
								<td key={cell.id} className={'border border-slate-100 dark:border-slate-900 p-1'}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
					</tr>
				))}
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
			
			<div>
				<span>skip: {skip}, limit: {limit}</span>
				{total !== undefined && (
					<span>, total: {total}, has more: {skip + limit < total}</span>
				)}
			</div>
		</RootLayout>
	)
}

export default AdminPage


