import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export const useLazyTheme = () => {
	const { theme, ...props } = useTheme()
	const [isMounted, setMounted] = useState(false)
	
	useEffect(() => {
		setMounted(true)
	}, [])
	
	return { theme: !isMounted ? undefined : theme, ...props }
}
