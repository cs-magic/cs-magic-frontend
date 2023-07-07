export interface FastapiError {
	status: number
	data: {
		detail: string
	}
}


/**
 * ref: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
 * @param error
 * @return {error is FastapiError}
 */
export const isFastapiError = (error: unknown): error is FastapiError =>
	typeof error === 'object' && error !== null && 'data' in error && typeof (error.data as any).detail === 'string'
