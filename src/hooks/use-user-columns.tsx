import { createColumnHelper } from '@tanstack/react-table'
import { IUser, UserPlanningType, UserRole } from '@/ds/user'
import { useUpdateBasicUserMutation, useUpdateOpenAIUserMutation } from '@/states/api/userApi'
import { UserAvatarView } from '@/components/general/UserAvatarView'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import _ from 'lodash'
import { Input } from '@/components/ui/input'
import React from 'react'
import Link from 'next/link'
import { getUserLink } from '@/lib/utils'

export const useUserColumns = () => {
	const columnHelper = createColumnHelper<IUser>()
	const [updateBasicUser] = useUpdateBasicUserMutation()
	const [updateOpenAIUser] = useUpdateOpenAIUserMutation()
	
	const columns = [
		columnHelper.display({
			header: 'No.',
			cell: (props) => <span>{props.row.index + 1}</span>,
		}),
		columnHelper.accessor('id', {
			cell: ({ cell }) =>
				<Link href={getUserLink(cell.getValue())}>
					<span className={'block w-[16rem] truncate'}>{cell.getValue()}</span>
				</Link>
			,
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
					cell: ({ cell, row: { original } }) => (
						<Select value={cell.getValue()} onValueChange={async (role: UserRole) => {
							await updateBasicUser({ id: original.id, body: { role } })
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
					cell: ({ cell, row: { original } }) => (
						<Select defaultValue={cell.getValue()} onValueChange={async (planning: UserPlanningType) => {
							await updateBasicUser({ id: original.id, body: _.merge({}, original.basic, { membership: { planning } }) })
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
			header: () => <span>Bills</span>,
			columns: [
				columnHelper.accessor('openai.balance', {
					header: 'Balance',
					cell: ({ cell, row: { original } }) => (
						<Input type={'number'} className={'w-28'} defaultValue={cell.getValue()} onBlur={async (event) => {
							await updateOpenAIUser({ id: original.id, body: _.merge({}, original.openai, { balance: event.currentTarget.value }) })
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
			cell: ({ cell, row: { original } }) => (
				<Input className={'w-32'} defaultValue={cell.getValue() || ''} onBlur={async (event) => {
					await updateBasicUser({ id: original.id, body: _.merge({}, original.basic, { note: event.currentTarget.value }) })
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
	
	return columns
}
