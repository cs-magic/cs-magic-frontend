import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/states/hooks'
import { selectUser, selectUserID } from '@/states/features/user'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import _ from 'lodash'
import Image from 'next/image'
import { AspectRatio } from '../ui/aspect-ratio'


export enum UserPlanningCharge {
	manual = 'manual',
	auto = 'auto',
}

export const CompUserPlanning = () => {
	const user = useAppSelector(selectUser)!
	
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'destructive'} size={'sm'}>Change Planning</Button>
			</DialogTrigger>
			
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Change Planning</DialogTitle>
				</DialogHeader>
				
				<div>current planning: {user.planning}</div>
				
				<Tabs defaultValue={UserPlanningCharge.manual}>
					<TabsList>
						{
							Object.keys(UserPlanningCharge).map((key) => (
								<TabsTrigger value={key} key={key}>{_.capitalize(key)}</TabsTrigger>
							))
						}
					</TabsList>
					
					<TabsContent value={UserPlanningCharge.manual}>
						<p>Please add my wechat for the planning detail.</p>
						<AspectRatio ratio={2 / 3}>
							{/*<Image src={'/dynamic/cs-magic-inner-test-230407.jpeg'} alt={'cs-magic-inner-test-230407.jpeg'} fill/>*/}
							<Image src={'/qrcodes/wechat-mark.jpeg'} alt={'wechat-mark.jpeg'} fill/>
						</AspectRatio>
					</TabsContent>
					
					<TabsContent value={UserPlanningCharge.auto}>
						<p>Sorry! </p>
						<p>Currently we only support the manual way to change your user planning!</p>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	)
}
