import { RootLayout } from '@/components/layouts/RootLayout'
import { useAdmin } from '@/hooks/use-user'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'
import { useListUsersQuery } from '@/states/api/userApi'
import { useU } from '@/hooks/use-u'
import React from 'react'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { IconLoader } from '@tabler/icons-react'
import { useUserColumns } from '@/hooks/use-user-columns'


export const Loading = () => (<IconLoader className={'animate-spin'}/>)

export const AdminPage = () => {
	const u = useU()
	const isAdmin = useAdmin()
	
	const { data: listUsersRes, isLoading } = useListUsersQuery(undefined, { skip: !isAdmin })
	const columns = useUserColumns()
	
	const table = useReactTable({
		data: listUsersRes?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	})
	
	return (
		<RootLayout title={u.routers.admin.console}>
			{
				isLoading ? <CentralLoadingComp/> : (
					
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
											{
												typeof row.original === 'string'
													? <Loading/>
													: flexRender(cell.column.columnDef.cell, cell.getContext())
											}
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
				)
			}
			
			<div>
				total: {listUsersRes?.meta.total}
			</div>
		</RootLayout>
	)
}

export default AdminPage


