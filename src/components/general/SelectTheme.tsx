import { IconPalette } from '@tabler/icons-react'
import { useLazyTheme } from '@/hooks/use-theme'
import { useLang } from '@/hooks/use-lang'
import { BaseSelect } from '@/components/general/BaseSelect'


export const SelectTheme = (props: {
	withText?: boolean,
	withIconSuffix?: boolean,
	withIconPrefix?: boolean
}) => {
	const u = useLang()
	const { theme, themes, setTheme } = useLazyTheme()
	console.log({themes})
	
	return (
		<BaseSelect label={u.display.navs.themes} v={theme} vs={themes} setV={setTheme} icon={<IconPalette/>} {...props}/>
	)
}
