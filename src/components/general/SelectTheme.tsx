import { IconPalette } from '@tabler/icons-react'
import { useLazyTheme } from '@/hooks/use-theme'
import { useU } from '@/hooks/use-u'
import { BaseSelect } from '@/components/general/BaseSelect'
import { ComponentProps } from 'react'
import { Select } from '@/components/ui/select'


export const SelectTheme = ({ withText, withIconSuffix, withIconPrefix, ...props }: {
	withText?: boolean,
	withIconSuffix?: boolean,
	withIconPrefix?: boolean
} & ComponentProps<typeof Select>) => {
	const u = useU()
	const { theme, themes, setTheme } = useLazyTheme()
	
	
	return (
		<BaseSelect
			label={u.display.navs.themes}
			v={theme}
			vs={themes}
			setV={setTheme}
			icon={<IconPalette/>}
			withIconPrefix={withIconPrefix}
			withIconSuffix={withIconSuffix}
			withText={withText}
			{...props}/>
	)
}
