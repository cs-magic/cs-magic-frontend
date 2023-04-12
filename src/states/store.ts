import { configureStore } from '@reduxjs/toolkit'
import conversationSlice from '@/states/features/conversationSlice'
import { messageSlice } from '@/states/features/messageSlice'
import userSlice from '@/states/features/userSlice'
import logger from 'redux-logger'
import notificationSlice from '@/states/features/notificationSlice'
import chatgptConversationApi from '@/states/apis/chatgptConversationApi'


const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		conversation: conversationSlice.reducer,
		messages: messageSlice.reducer,
		notification: notificationSlice.reducer,
		[chatgptConversationApi.reducerPath]: chatgptConversationApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
	.concat([
		chatgptConversationApi.middleware,
		logger
	])
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

