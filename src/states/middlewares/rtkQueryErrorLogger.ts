import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { isFastapiError } from '@/ds/error'
import { toast } from '@/hooks/use-toast'

/**
 * Log a warning and show a toast!
 *
 * ref: https://redux-toolkit.js.org/rtk-query/usage/error-handling#handling-errors-at-a-macro-level
 */
export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => (next) => (action) => {
		// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
		if (isRejectedWithValue(action)) {
			console.warn({ action })
			if (isFastapiError(action.payload)) {
				toast({ title: action.payload.data.detail, variant: 'destructive' })
			}
		}
		
		return next(action)
	}
