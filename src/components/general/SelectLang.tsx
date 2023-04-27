import { langs, LangType } from '@/ds/general'
import { IconLanguage } from '@tabler/icons-react'
import { BaseSelect } from '@/components/general/BaseSelect'
import { useU } from '@/hooks/use-u'
import { useAppDispatch } from '@/hooks/use-redux'
import { asyncSetLang } from '@/states/thunks/i18nThunks'


export const SelectLang = (props: {
	withText?: boolean,
	withIconSuffix?: boolean,
	withIconPrefix?: boolean
}) => {
	const u = useU()
	const dispatch = useAppDispatch()
	const setV = (lang: LangType) => dispatch(asyncSetLang(lang))
	
	return (
		<BaseSelect label={u.display.navs.languages} vs={langs} setV={setV} icon={<IconLanguage/>} {...props}/>
	)
}
