import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'

export const useU = () => {
	return useAppSelector(selectU)
}
