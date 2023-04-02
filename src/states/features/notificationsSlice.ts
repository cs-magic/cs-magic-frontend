import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'


export type NotificationsState = {
	top: string | null
}

const initialState: NotificationsState = {
	top: null,
}

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		setTopNotification: (state, action: PayloadAction<string | null>) => {
			state.top = action.payload
		},
	},
})


export const  {setTopNotification} = notificationsSlice.actions

export const selectNotifications = (state: RootState) => state.notifications

export default notificationsSlice
