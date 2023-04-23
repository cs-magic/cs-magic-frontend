import { UserPlanningPurchaseComp } from '@/components/userPlanning/UserPlanningPurchaseComp'
import { RootLayout } from '@/components/layouts/RootLayout'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { userPlanningPurchaseList } from '@/config/userPlanning'


export const UserPlanningPage = () => {
	
	const u = useAppSelector(selectU)
	
	return (
		<RootLayout title={u.routes.user.planning}>
			<div className={'w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'}>
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
