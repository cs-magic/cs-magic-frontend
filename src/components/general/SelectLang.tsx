import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { asyncSetLang } from '@/states/thunks/i18nThunks'
import { langs, LangType } from '@/ds/general'
import { IconLanguage } from '@tabler/icons-react'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { selectLang } from '@/states/features/i18nSlice'

export const SelectLang = ({ withText, disableIcon }: { withText?: boolean, disableIcon?: boolean }) => {
	const dispatch = useAppDispatch()
	const lang = useAppSelector(selectLang)
	
	return (
		<Select onValueChange={(v) => dispatch(asyncSetLang(v as LangType))}>
			<SelectTrigger className={'w-fit'} disableIcon={disableIcon}>
				<SelectValue defaultValue={lang}>
					<div className={'inline-flex gap-2 items-center'}>
						<IconLanguage/>
						<span>{withText && 'Languages'}</span>
					</div>
				</SelectValue>
			</SelectTrigger>
			
			<SelectContent className={'w-32'}>
				<SelectGroup>
					<SelectLabel>Languages</SelectLabel>
					{
						langs.map((theme) => (
							<SelectItem className={'cursor-pointer'} value={theme} key={theme}>{theme}</SelectItem>
						))
					}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
