import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import _ from 'lodash'
import { AspectRatio } from './ui/aspect-ratio'
import { ContactView } from '@/components/ContactView'


export enum UserPlanningCharge {
	manual = 'manual',
	auto = 'auto',
}

export const UserPlanningView = () => {
	
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'destructive'} size={null} className={'ml-auto px-4 py-0.5'}>Buy</Button>
			</DialogTrigger>
			
			<DialogContent>
				<DialogHeader>
					<DialogTitle>会员计划</DialogTitle>
				</DialogHeader>
				
				
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
							<ContactView/>
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
