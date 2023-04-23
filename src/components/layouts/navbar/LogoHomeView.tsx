import Link from 'next/link'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { HTMLAttributes } from 'react'
import Logo from '@/assets/logo/logo.svg'
import Image from 'next/image'
import LogoComp from '@/components/general/LogoComp'


// export const Logo = (props: HTMLAttributes<SVGElement>) => (
// 	<svg stroke="currentColor" strokeWidth="2" id="_图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="currentColor">
// 		<rect x="50.33" y="696.13" width="22.01" height="22.01"/>
// 		<rect x="72.34" y="674.29" width="22.01" height="22.01"/>
// 		<rect x="94.35" y="652.28" width="22.01" height="22.01"/>
// 		<rect x="116.36" y="630.27" width="22.01" height="22.01"/>
// 		<rect x="138.37" y="608.25" width="22.01" height="22.01"/>
// 		<rect x="160.38" y="586.41" width="22.01" height="22.01"/>
// 		<rect x="182.39" y="564.4" width="22.01" height="22.01"/>
// 		<rect x="204.41" y="542.39" width="22.01" height="22.01"/>
// 		<rect x="226.42" y="520.09" width="22.01" height="22.01"/>
// 		<rect x="248.43" y="498.25" width="22.01" height="22.01"/>
// 		<rect x="270.44" y="476.24" width="22.01" height="22.01"/>
// 		<rect x="292.45" y="454.23" width="22.01" height="22.01"/>
// 		<rect x="314.46" y="432.22" width="22.01" height="22.01"/>
// 		<rect x="336.47" y="410.38" width="22.01" height="22.01"/>
// 		<rect x="358.49" y="388.37" width="22.01" height="22.01"/>
// 		<rect x="380.5" y="366.36" width="22.01" height="22.01"/>
// 		<rect x="402.51" y="344.35" width="22.01" height="22.01"/>
// 		<rect x="424.52" y="322.05" width="22.01" height="22.01"/>
// 		<rect x="446.53" y="300.21" width="22.01" height="22.01"/>
// 		<rect x="468.54" y="278.2" width="22.01" height="22.01"/>
// 		<rect x="490.55" y="256.18" width="22.01" height="22.01"/>
// 		<rect x="512.57" y="234.17" width="22.01" height="22.01"/>
// 		<rect x="534.58" y="212.33" width="22.01" height="22.01"/>
// 		<rect x="594.22" y="121.06" width="29.45" height="13.79" transform="translate(154.32 552.81) rotate(-54.93)"/>
// 		<rect x="677.94" y="150.56" width="74.62" height="13.73" transform="translate(220.33 -382.41) rotate(35.07)"/>
// 		<rect x="513.68" y="195.21" width="13.79" height="13.79" transform="translate(830.49 666.64) rotate(-144.93)"/>
// 		<rect x="94.35" y="695.81" width="22.01" height="22.01"/>
// 		<rect x="116.36" y="673.97" width="22.01" height="22.01"/>
// 		<rect x="138.37" y="651.95" width="22.01" height="22.01"/>
// 		<rect x="160.38" y="629.94" width="22.01" height="22.01"/>
// 		<rect x="182.39" y="607.93" width="22.01" height="22.01"/>
// 		<rect x="204.41" y="586.09" width="22.01" height="22.01"/>
// 		<rect x="226.42" y="564.69" width="22.01" height="22.01"/>
// 		<rect x="248.43" y="542.07" width="22.01" height="22.01"/>
// 		<rect x="270.99" y="519.77" width="22.01" height="22.01"/>
// 		<rect x="292.45" y="497.93" width="22.01" height="22.01"/>
// 		<rect x="314.46" y="475.92" width="22.01" height="22.01"/>
// 		<rect x="336.47" y="453.91" width="22.01" height="22.01"/>
// 		<rect x="358.49" y="431.9" width="22.01" height="22.01"/>
// 		<rect x="380.5" y="410.06" width="22.01" height="22.01"/>
// 		<rect x="402.96" y="388.37" width="22.01" height="22.01"/>
// 		<rect x="424.52" y="366.36" width="22.01" height="22.01"/>
// 		<rect x="446.53" y="344.35" width="22.01" height="22.01"/>
// 		<rect x="468.54" y="322.05" width="22.01" height="22.01"/>
// 		<rect x="490.55" y="300.21" width="22.01" height="22.01"/>
// 		<rect x="512.57" y="278.2" width="22.01" height="22.01"/>
// 		<rect x="534.58" y="256.18" width="22.01" height="22.01"/>
// 		<rect x="556.55" y="234.17" width="22.01" height="22.01"/>
// 		<rect x="72.34" y="717.97" width="22.01" height="22.01"/>
// 		<rect x="50.33" y="739.98" width="22.01" height="22.01"/>
// 		<rect x="479.93" y="156.73" width="14.93" height="29.25" transform="translate(186.96 -248.95) rotate(35.07)"/>
// 		<rect x="539.05" y="189.04" width="13.69" height="29.25" transform="translate(65.53 533.41) rotate(-54.93)"/>
// 		<rect x="585.72" y="222.72" width="13.69" height="29.25" transform="translate(57.82 585.94) rotate(-54.93)"/>
// 		<rect x="575.85" y="194.18" width="13.79" height="13.79" transform="translate(1082.16 -160.32) rotate(125.07)"/>
// 		<rect x="562.09" y="196.93" width="13.79" height="13.79" transform="translate(1062.75 -144.73) rotate(125.07)"/>
// 		<rect x="578.6" y="210.69" width="13.79" height="13.79" transform="translate(1100 -136.58) rotate(125.07)"/>
// 		<rect x="626.39" y="109.99" width="16.07" height="16.07" transform="translate(1085.83 579.17) rotate(-144.93)"/>
// 		<rect x="494.67" y="198.09" width="13.79" height="13.79" transform="translate(794.27 660.94) rotate(-144.93)"/>
// 		<rect x="479.55" y="196.93" width="13.79" height="13.79" transform="translate(767.44 650.16) rotate(-144.93)"/>
// 		<rect x="474.15" y="185.5" width="11.85" height="11.85" transform="translate(56.43 487.48) rotate(-56.69)"/>
// 		<rect x="596.19" y="252.62" width="13.79" height="13.79" transform="translate(251.43 -294.92) rotate(34.33)"/>
// 		<rect x="638.57" y="268.11" width="14.93" height="29.25" transform="translate(1020.06 880.56) rotate(-145.67)"/>
// 		<rect x="600.19" y="271.43" width="13.79" height="13.79" transform="translate(262.73 -293.9) rotate(34.33)"/>
// 		<rect x="606.58" y="285.17" width="13.79" height="13.79" transform="translate(271.6 -295.11) rotate(34.33)"/>
// 		<rect x="621.39" y="287.73" width="11.85" height="11.85" transform="translate(31.02 646.07) rotate(-55.67)"/>
// 		<rect x="644.27" y="223.39" width="14.91" height="43.59" transform="translate(1132.58 748.81) rotate(-154.29)"/>
// 		<rect x="513.11" y="130.16" width="14.91" height="43.59" transform="translate(806.72 612.61) rotate(-138.12)"/>
// 		<rect x="537.57" y="124.69" width="29.45" height="13.79" transform="translate(127.25 507.99) rotate(-54.93)"/>
// 		<rect x="644.8" y="201" width="32.35" height="13.78" transform="translate(150.45 676.37) rotate(-60)"/>
// 		<rect x="539.6" y="70.9" width="19.25" height="19.25" transform="translate(952.45 462.02) rotate(-144.93)"/>
// 		<rect x="545.65" y="96.72" width="16.07" height="16.07" transform="translate(946.65 508.64) rotate(-144.93)"/>
// 		<rect x="677.68" y="186.38" width="16.07" height="16.07" transform="translate(1135.21 747.55) rotate(-144.93)"/>
// 		<rect x="700.69" y="180.49" width="19.25" height="19.25" transform="translate(1182.42 753.86) rotate(-144.93)"/>
// 		<rect x="545.27" y="55.82" width="73.67" height="14.95" transform="translate(142.06 -322.99) rotate(35.07)"/>
// 		<rect x="721.9" y="177.87" width="16.07" height="16.07" transform="translate(1220.51 757.49) rotate(-144.93)"/>
// 		<rect x="541.19" y="50.99" width="16.07" height="16.07" transform="translate(964.8 422.93) rotate(-144.93)"/>
// 		<rect x="615.5" y="64.13" width="30.16" height="13.11" transform="translate(156.99 492.99) rotate(-48.12)"/>
// 		<rect x="676.05" y="108.12" width="30.95" height="13.96" transform="translate(246.08 656.43) rotate(-60)"/>
// 		<rect x="646.25" y="51.4" width="29.45" height="13.79" transform="translate(152.37 484.46) rotate(-45)"/>
// 		<rect x="678.72" y="77.78" width="29.45" height="13.79" transform="translate(316.33 672.74) rotate(-64.29)"/>
// 		<rect x="672.15" y="41.67" width="13.79" height="13.79" transform="translate(1168.5 -424.59) rotate(131.88)"/>
// 		<rect x="687.44" y="41.5" width="15.8" height="15.8" transform="translate(255.36 590.1) rotate(-54.93)"/>
// 		<rect x="693.71" y="59.15" width="13.79" height="13.79" transform="translate(1108.1 -507.67) rotate(120)"/>
// 	</svg>
// )

export const LogoHomeView = () => {
	const u = useAppSelector(selectU)
	
	return (
		<Link href={'/'} className={'inline-flex gap-2 items-center cursor-pointer'}>
			{/*<Logo color={'red'}/>*/}
			{/*<Image priority src={Logo} alt={'logo'} width={36} height={36} className={'hidden md:block text-primary'} color={'red'} />*/}
			{/*<Image src={'/logo/logo-transparent.png'} alt={'logo'} width={36} height={36} className={'hidden md:block'}/>*/}
			
			{/*<Logo className={'w-8 h-8'} />*/}
			
			<LogoComp className={'w-8 h-8'}/>
			
			<div className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{u.website.platformName}</div>
		</Link>
	)
}
