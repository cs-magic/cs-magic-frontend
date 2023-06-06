import { EffectCallback, useEffect, useRef, useState } from 'react'

export const useClient = <T extends any = {}>(comp: T): T | null => {
	const [cur, setCur] = useState<T | null>(null)
	
	useEffect(() => {
		console.log(`using client...`)
		setCur(comp)
	}, [])
	
	return cur
}


/**
 * ref: https://github.com/facebook/react/issues/24502#issuecomment-1140270207
 * @param {React.EffectCallback} effect
 */
export const useMount = (effect: EffectCallback) => {
	const mounted = useRef(false)
	
	useEffect(() => {
		if (mounted.current) {
			return effect()
		}
		
		mounted.current = true
		
		return () => {}
	}, [mounted, effect])
}
