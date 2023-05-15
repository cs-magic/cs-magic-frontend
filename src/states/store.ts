import { configureStore } from '@reduxjs/toolkit'

import notificationSlice from '@/states/features/notificationSlice'
import { baseApi } from '@/states/api/baseApi'
import { createLogger } from 'redux-logger'
import { i18nSlice } from '@/states/features/i18nSlice'


const logger = createLogger({
	// 消除 RTK Query 框架层面的一些 logger
	predicate: (getState, action, logEntry) => ![
		'config',
		// 'executeQuery',
		'internalSubscriptions',
	].find((s) => action.type.includes(s)),
})


const store = configureStore({
	reducer: {
		i18n: i18nSlice.reducer,
		notification: notificationSlice.reducer,
		[baseApi.reducerPath]: baseApi.reducer,
		// [remoteApi.reducerPath]: remoteApi.reducer,
		// [backApi.reducerPath]: backApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
		.concat([
			baseApi.middleware,
			// remoteApi.middleware,
			// backApi.middleware,
			// logger,
		]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

