import { configureStore } from '@reduxjs/toolkit'
import conversationsSlice from '@/states/features/conversations'
import { messagesSlice } from '@/states/features/messages'


const store = configureStore({
	reducer: {
		conversations: conversationsSlice.reducer,
		messages: messagesSlice.reducer
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

