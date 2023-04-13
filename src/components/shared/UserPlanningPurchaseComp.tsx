import _ from 'lodash'
import { clsx } from 'clsx'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'
import { Label } from '../ui/label'
import { useState } from 'react'
import { UserPlanningComp } from '@/components/shared/UserPlanningComp'
import { IUserPlanningPurchaseComp } from '@/ds/userPlanning'


export const UserPlanningPurchaseComp = (
	{
		name, prices, features, cover, tags, chatgptTokens,
	}:
		IUserPlanningPurchaseComp) => {
	
	const [byYear, setByYear] = useState(false)
	
	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			
			<AspectRatio ratio={9 / 12}>
				<Image src={cover} alt={name} fill priority sizes={'33vw'}/>
			</AspectRatio>
			
			<div className="card-body grow">
				
				<h2 className="card-title">
					{_.startCase(_.camelCase(name)).split(' ').join('-').toUpperCase()}
					{tags.map((tag) => (
						<div key={tag} className="badge badge-secondary">{tag}</div>
					))}
				</h2>
				
				<div>
					<label className="cursor-pointer label">
						<span className="label-text">ChatGPT专属账号 <span className={'text-primary font-semibold text-lg'}>{chatgptTokens}w</span> token</span>
						<input type="checkbox" checked readOnly className={clsx(
							'checkbox checkbox-sm ',
							'checkbox-success',
						)}/>
					</label>
					
					{features.map((feature) => (
						<label className="cursor-pointer label" key={feature.name}>
							<span className="label-text">{feature.name}</span>
							<input type="checkbox" checked readOnly className={clsx(
								'checkbox checkbox-sm',
								feature.status === 'finished' && 'checkbox-success',
							)}/>
						</label>
					))}
					<label className="cursor-pointer label">
						<span className="label-text">...</span>
					</label>
				</div>
			
			</div>
			
			<div className={'w-full p-4 flex items-center justify-start gap-2'}>
				{
					prices.period ? (
						<>
							<p>按{byYear ? '年' : '月'}付费</p>
							<Switch id={'price'} onCheckedChange={(checked) => {
								setByYear(checked)
							}}/>
							<Label htmlFor={'price'}>￥{(byYear ? prices.period.year : prices.period.month) || '?'}</Label>
						</>
					) : (
						<>
							<p>按量付费</p>
							<Label htmlFor={'price'}>￥{prices.quantity}</Label>
						</>
					)
				}
				
				<UserPlanningComp/>
			</div>
		</div>
	)
}
