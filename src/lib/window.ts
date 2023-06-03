export const isServer = () => typeof window === 'undefined'
export const isWindow = () => !isServer()
