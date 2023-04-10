import { ChatgptRoleType, IChatgptMessage } from '@/ds/chatgpt_v2'
import { clsx } from 'clsx'
import { IconBrandOpenai } from '@tabler/icons-react'
import { AvatarView } from '@/components/views/AvatarView'
import { useAppSelector } from '@/states/hooks'
import { selectUserBasic } from '@/states/features/userSlice'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'


export const MessageComp = ({ msg }: {
	msg: IChatgptMessage
}) => {
	const userBasic = useAppSelector(selectUserBasic)
	
	return (
		<div className={clsx(
			'w-full',
			msg.role === ChatgptRoleType.assistant ? 'bg-gray-50 dark:bg-[#444654]' : 'dark:bg-gray-800',
		)}>
			{/*// 这里直接copy的chatgpt居中的css*/}
			<div className="py-1 px-2 text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex m-auto break-all">
				
				<div className={'mt-5'}>
					{
						msg.role === ChatgptRoleType.assistant
							? <IconBrandOpenai size={24} className={'shrink-0 w-6 h-6'}/>
							: <AvatarView user={userBasic} className={'shrink-0 w-6 h-6'}/>
					}
				</div>
				
				<article className={'prose'}>
					<ReactMarkdown
						className={'grow'}
						remarkPlugins={[]}
						rehypePlugins={[
							[rehypeHighlight, { ignoreMissing: true }],
						]}
					>
						{msg.content}
					</ReactMarkdown>
				</article>
			</div>
		</div>
	)
}
