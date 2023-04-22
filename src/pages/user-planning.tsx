import { UserPlanningPurchaseComp } from '@/components/shared/UserPlanningPurchaseComp'
import { RootLayout } from '@/layouts/RootLayout'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { userPlanningPurchaseList } from '@/config/userPlanning'


export const UserPlanningPage = () => {
	
	const u = useAppSelector(selectU)
	
	return (
		<RootLayout title={u.routes.user.planning}>
			<div className={'w-full h-full flex flex-wrap gap-4 justify-evenly text-base-100'}>
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
