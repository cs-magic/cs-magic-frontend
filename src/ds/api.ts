export interface IApiListRes<T extends any> {
	data: T[]
	meta: {
		total: number
		// finished: boolean
	}
}

export interface IQuery {
	skip: number
	limit: number
}
