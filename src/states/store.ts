import { configureStore } from '@reduxjs/toolkit'
import conversationsSlice from '@/states/features/conversations'
import { messagesSlice } from '@/states/features/messages'
import userSlice from '@/states/features/user'
import logger from 'redux-logger'


const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		conversations: conversationsSlice.reducer,
		messages: messagesSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
	.concat([
		logger
	])
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

