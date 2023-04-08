import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}


export const ensureSole = (s: string | string[] | null): string | null =>
	Array.isArray(s) ? s[0] : s
