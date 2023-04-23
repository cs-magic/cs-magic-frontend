import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IconPalette } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'

export const SelectTheme = ({ withText, withIconSuffix, withIconPrefix }: { withText?: boolean, withIconSuffix?: boolean, withIconPrefix?: boolean }) => {
	const { theme, setTheme, themes } = useTheme()
	const [isMounted, setMounted] = useState(false)
	const u = useAppSelector(selectU)
	
	useEffect(() => {
		setMounted(true)
	}, [])
	
	if (!isMounted) return <></>
	
	return (
		<Select onValueChange={setTheme}>
			<SelectTrigger withIconSuffix={withIconSuffix} className={'h-fit py-0'}>
				<SelectValue defaultValue={theme} asChild>
					<span className={'inline-flex items-center gap-2'}>
						{withIconPrefix && <IconPalette/>}
						{withText && <span>{u.display.navs.themes}</span>}
					</span>
				</SelectValue>
			</SelectTrigger>
			
			<SelectContent className={'w-32'}>
				<SelectGroup>
					<SelectLabel>Themes</SelectLabel>
					{
						themes.map((theme) => (
							<SelectItem className={'cursor-pointer'} value={theme} key={theme}>{theme}</SelectItem>
						))
					}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
