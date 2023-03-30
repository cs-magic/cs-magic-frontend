import { configureStore } from '@reduxjs/toolkit'
import conversationsSlice from '@/states/features/conversations'


const store = configureStore({
	reducer: {
		conversations: conversationsSlice.reducer
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

