import moment from 'moment'
import { selectLang } from '@/states/features/i18nSlice'
import { useAppSelector } from '@/hooks/use-redux'

export const useMoment = () => {
	const lang = useAppSelector(selectLang)
	moment.locale(lang)
	return moment
}
