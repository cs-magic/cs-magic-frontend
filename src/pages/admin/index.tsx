import { RootLayout } from '@/components/layouts/RootLayout'
import { useUser } from '@/hooks/use-user'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'
import { useListAllUserQuery, useUpdateBasicUserMutation, useUpdateOpenAIUserMutation } from '@/api/userApi'
import { useU } from '@/hooks/use-u'
import React from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { IUser, UserPlanningType, UserRole } from '@/ds/user'
import { UserAvatarView } from '@/components/general/UserAvatarView'
import { toast } from '@/hooks/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import _ from 'lodash'
import { Input } from '@/components/ui/input'


export const AdminPage = () => {
	const u = useU()
	const user = useUser()
	
	const { data = [], isLoading } = useListAllUserQuery(undefined, { skip: !user || user.basic.role !== 'admin' })
	const [updateBasicUser] = useUpdateBasicUserMutation()
	const [updateOpenAIUser] = useUpdateOpenAIUserMutation()
	
	const columnHelper = createColumnHelper<IUser>()
	
	const columns = [
		columnHelper.display({
			header: 'No.',
			cell: (props) => <span>{props.row.index + 1}</span>,
		}),
		columnHelper.accessor('id', {
			cell: ({ cell }) => <span className={'block w-[16rem] truncate'}>{cell.getValue()}</span>,
		}),
		columnHelper.group({
			id: 'basic',
			header: () => <span>Basic</span>,
			columns: [
				columnHelper.accessor('basic.name', {
					header: 'Name',
				}),
				columnHelper.accessor('basic.avatar', {
					header: 'Avatar',
					cell: ({ row }) => <UserAvatarView user={row.original}/>,
				}),
				columnHelper.accessor('basic.role', {
					header: 'Role',
					cell: ({ cell, row }) => (
						<Select value={cell.getValue()} onValueChange={async (role: UserRole) => {
							await updateBasicUser({ id: row.original.id, body: { role } })
							toast({ title: 'updated role' })
						}}>
							<SelectTrigger className={'border'}>
								<SelectValue defaultValue={cell.getValue()}/>
							</SelectTrigger>
							<SelectContent>
								{Object.values(UserRole).map((role) => (
									<SelectItem value={role} key={role}>{role}</SelectItem>
								))}
							</SelectContent>
						</Select>
					),
				}),
				columnHelper.accessor('basic.membership.planning', {
					header: 'Planning',
					enableSorting: true,
					sortingFn: 'auto',
					cell: ({ cell, row }) => (
						<Select defaultValue={cell.getValue()} onValueChange={async (planning: UserPlanningType) => {
							await updateBasicUser({ id: row.original.id, body: _.merge({}, row.original.basic, { membership: { planning } }) })
							toast({ title: 'updated planning' })
						}}>
							<SelectTrigger>
								<SelectValue placeholder={'planning'}/>
							</SelectTrigger>
							
							<SelectContent>
								{Object.values(UserPlanningType).map((planning) => (
									<SelectItem value={planning} key={planning}>{planning}</SelectItem>
								))}
							</SelectContent>
						</Select>
					),
				}),
				// columnHelper.accessor('basic.membership.expire', {
				// 	header: 'Expiration',
				// }),
			],
		}),
		columnHelper.group({
			id: 'openai',
			header: () => <span>OpenAI</span>,
			columns: [
				columnHelper.accessor('openai.balance', {
					header: 'Balance',
					cell: ({ cell, row }) => (
						<Input type={'number'} className={'w-28'} defaultValue={cell.getValue()} onBlur={async (event) => {
							await updateOpenAIUser({ id: row.original.id, body: _.merge({}, row.original.openai, { balance: event.currentTarget.value }) })
							toast({ title: 'updated balance' })
						}}/>
					),
				}),
				columnHelper.accessor('openai.consumption', {
					header: 'Consumption',
				}),
				columnHelper.accessor('openai.cnt', {
					header: 'Count',
				}),
			],
		}),
		columnHelper.accessor('basic.note', {
			header: 'Note',
			cell: ({ cell, row }) => (
				<Input className={'w-32'} defaultValue={cell.getValue() || ''} onBlur={async (event) => {
					await updateBasicUser({ id: row.original.id, body: _.merge({}, row.original.basic, { note: event.currentTarget.value }) })
					toast({ title: 'updated note' })
				}}/>
			),
		}),
		// @note: 现在改成实时自动同步后，就不需要额外的confirm了
		// columnHelper.display({
		// 	header: 'Operations',
		// 	cell: ({ row }) => <UserOperation user={row.original}/>,
		// }),
	]
	
	
	const table = useReactTable({
		data,
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
								{row.getVisibleCells().map(cell => (
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
				)
			}
		</RootLayout>
	)
}

export default AdminPage


