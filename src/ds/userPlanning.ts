import { UserPlanningType } from '@/ds/user'
import { IFeature } from '@/ds/general'

export interface IUserPlanningPurchaseComp {
	name: UserPlanningType
	cover: string
	prices: {
		quantity?: number
		period?: {
			month: number
			year?: number // m * 10
		}
	}
	tags: string[]
	features: IFeature[]
	chatgptTokens: number
}
