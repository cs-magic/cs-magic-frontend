import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'


export type NotificationsState = {
	top: string | null
}

const initialState: NotificationsState = {
	top: null,
}

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setTopNotification: (state, action: PayloadAction<string | null>) => {
			state.top = action.payload
		},
	},
})


export const  {setTopNotification} = notificationSlice.actions

export const selectNotifications = (state: RootState) => state.notification

export default notificationSlice
