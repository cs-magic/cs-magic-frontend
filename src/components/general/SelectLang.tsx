import { langs, LangType } from '@/ds/general'
import { IconLanguage } from '@tabler/icons-react'
import { BaseSelect } from '@/components/general/BaseSelect'
import { useLang } from '@/hooks/use-lang'
import { useAppDispatch } from '@/hooks/use-redux'
import { asyncSetLang } from '@/states/thunks/i18nThunks'


export const SelectLang = (props: {
	withText?: boolean,
	withIconSuffix?: boolean,
	withIconPrefix?: boolean
}) => {
	const u = useLang()
	const dispatch = useAppDispatch()
	const setV = (lang: LangType) => dispatch(asyncSetLang(lang))
	
	return (
		<BaseSelect label={u.display.navs.languages} vs={langs} setV={setV} icon={<IconLanguage/>} {...props}/>
	)
}
