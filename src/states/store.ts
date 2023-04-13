import { configureStore } from '@reduxjs/toolkit'
import conversationSlice from '@/states/features/conversationSlice'
import { messageSlice } from '@/states/features/messageSlice'
import userSlice from '@/states/features/userSlice'
import logger from 'redux-logger'
import notificationSlice from '@/states/features/notificationSlice'
import baseApi from '@/states/apis/baseApi'


const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		conversation: conversationSlice.reducer,
		messages: messageSlice.reducer,
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

