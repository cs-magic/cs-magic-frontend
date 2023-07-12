import { ReactNode, RefObject } from 'react'
import { useU } from '@/hooks/use-u'
import { useToast } from '@/hooks/use-toast'
import { ChatgptModelType, IChatgptConversationCreate } from '@/ds/openai/chatgpt'
import { CHATGPT_ROLE_PROMPT_DEFAULT } from '@/settings'
import { SendInput } from '@/components/chatgpt/send-input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCreateConversationMutation } from '@/states/api/chatgptApi'
import { PlatformType } from '@/ds/openai'
import { useUser } from '@/hooks/use-user'

export const MessagesWithoutCid = ({ cid, conversationsComp }: { cid: null, conversationsComp: ReactNode }) => {
	const { toast } = useToast()
	
	const user = useUser()
	const u = useU()
	
	const [createConversation] = useCreateConversationMutation()
	
	const onSubmit = async (refInput: RefObject<HTMLTextAreaElement>) => {
		// 直接处理 client 端错误，不要直接pushMessage，否则会导致各种失配问题
		if (!user) return toast({ title: '聊天功能需要先登录再使用！', variant: 'destructive' })
		
		const content = refInput.current!.value
		refInput.current!.value = ''
		
		
		const createConversationModel: IChatgptConversationCreate = {
			user_id: user.id, platform_type: PlatformType.chatGPT, platform_params: {
				model: ChatgptModelType.gpt_35,
				system_prompt: CHATGPT_ROLE_PROMPT_DEFAULT, // todo: system prompt
			},
		}
		const { id } = await createConversation(createConversationModel).unwrap()
		
	}
	
	
	return (
		<div className={'grow items-stretch overflow-hidden flex flex-col'}>
			
			{
				//	todo: other hints
			}
			
			<SendInput handleSubmit={onSubmit} extraButtonsOnMobile={(
				<Sheet>
					<SheetTrigger asChild>
						<Button size={'sm'} className={'rounded-none'}>{u.ui.chat.btn.conversations}</Button>
					</SheetTrigger>
					<SheetContent className={'w-1/2 p-0 pt-10'} position={'left'}>
						{conversationsComp}
					</SheetContent>
				</Sheet>
			)}/>
		
		</div>
	)
}
