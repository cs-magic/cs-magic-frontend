import { configureStore } from '@reduxjs/toolkit'
import conversationsSlice from '@/states/features/conversationsSlice'
import { messagesSlice } from '@/states/features/messagesSlice'
import userSlice from '@/states/features/user'
import logger from 'redux-logger'
import notificationsSlice from '@/states/features/notificationsSlice'


const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		conversations: conversationsSlice.reducer,
		messages: messagesSlice.reducer,
		notifications: notificationsSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
	.concat([
		logger
	])
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

