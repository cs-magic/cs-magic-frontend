import { IconLoader, IconRotateClockwise2 } from '@tabler/icons-react'
import React from 'react'

export const CentralLoading = () => (
	<div className={'w-full h-full flex justify-center items-center'}>
		<IconRotateClockwise2 className={'animate-spin'}/>
	</div>
)
export const Loading = () => (<IconLoader className={'animate-spin'}/>)
