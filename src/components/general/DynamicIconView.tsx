import * as allIcons from '@tabler/icons-react'

export const DynamicIconView = ({ id, size = 16 }: {
	id: string
	size?: number
}) => {
	// ref: https://stackoverflow.com/a/73846364
	// @ts-ignore
	const Icon = allIcons[id]
	return <Icon size={size}/>
}
