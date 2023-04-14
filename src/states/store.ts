import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import notificationSlice from '@/states/features/notificationSlice'
import baseApi from '@/states/apis/baseApi'


const store = configureStore({
	reducer: {
		notification: notificationSlice.reducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
		.concat([
			baseApi.middleware,
			logger,
		]),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

