import { UserPlanningPurchaseComp } from '@/components/shared/UserPlanningPurchaseComp'
import { RootLayout } from '@/layouts/RootLayout'
import { userPlanningPurchaseList } from '@/config'


export const UserPlanningPage = () => {
	return (
		<RootLayout>
			<div className={'w-full h-full flex flex-wrap gap-4 justify-evenly'}>
				{
					userPlanningPurchaseList.map((item) => (
						<UserPlanningPurchaseComp {...item} key={item.name}/>
					))
				}
			</div>
		</RootLayout>
	)
}


export default UserPlanningPage
