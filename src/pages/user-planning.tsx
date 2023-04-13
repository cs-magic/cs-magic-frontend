import { UserPlanningPurchaseComp } from '@/components/shared/UserPlanningPurchaseComp'
import { RootLayout } from '@/layouts/RootLayout'
import { u, userPlanningPurchaseList } from '@/config'


export const UserPlanningPage = () => {
	return (
		<RootLayout title={u.routes.user.planning}>
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
