export interface IApiListRes<T extends any> {
	data: T[]
	meta: {
		total: number
		// finished: boolean
	}
}
