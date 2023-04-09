import { ID } from '@/ds/general'

export enum UserPlanning {
	guest = 'guest',
	registered = 'registered',
	vip = 'vip',
	vipGolden = 'vipGolden',
	vipPlatinum = 'vipPlatinum',
	vipDiamond = 'vipDiamond',
	vipBlack = 'vipBlack',
}

export interface IUserBasic {
	id: ID
	name: string
	email: string
	planning: UserPlanning
}

