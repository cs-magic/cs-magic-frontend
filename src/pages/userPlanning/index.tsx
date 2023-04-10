import { UserPlanningPurchaseComp } from '@/components/shared/UserPlanningPurchaseComp'
import { RootLayout } from '@/layouts/RootLayout'
import { userPlanningPurchaseList } from '@/config'


export const UserPlanningPage = () => {
	return (
		<RootLayout>
			<div className={'w-full grid grid-cols-1 md:grid-cols-3 gap-2'}>
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
