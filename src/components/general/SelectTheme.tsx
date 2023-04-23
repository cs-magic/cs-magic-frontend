import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IconPalette } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const SelectTheme = ({ withText, disableIcon }: { withText?: boolean, disableIcon?: boolean }) => {
	const { theme, setTheme, themes } = useTheme()
	const [isMounted, setMounted] = useState(false)
	
	useEffect(() => {
		setMounted(true)
	}, [])
	
	if (!isMounted) return <></>
	
	return (
		<Select onValueChange={setTheme}>
			<SelectTrigger disableIcon={disableIcon} className={'h-fit py-0'}>
				<SelectValue defaultValue={theme} asChild>
					<span className={'inline-flex items-center gap-2'}>
						<IconPalette/>
						<span>{withText && 'Palettes'}</span>
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
