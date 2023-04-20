import { clsx } from 'clsx'
import { IconBrandOpenai } from '@tabler/icons-react'
import { UserAvatarView } from '@/components/views/UserAvatarView'
import { useUser } from '@/hooks/use-user'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { IMessage, MessageRoleType, MessageType } from '@/ds/openai/message'
import { PlatformType } from '@/ds/openai/general'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { routers } from '@/config'


export const MessageComp = <T extends PlatformType>({ msg }: {
	msg: IMessage<T>
}) => {
	const user = useUser()!
	
	return (
		<div className={clsx(
			'w-full',
			msg.status === 'ERROR'
				? 'bg-red-300 dark:bg-red-700'
				: msg.platform_params.role === MessageRoleType.assistant
					? 'bg-bg-shade'
					: 'dark:bg-gray-800',
		)}>
			{/*// 这里直接copy的chatgpt居中的css*/}
			<div className="py-1 px-2 text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex m-auto break-all">
				
				<div className={'mt-5'}>
					{
						msg.platform_params.role === MessageRoleType.assistant
							? <IconBrandOpenai size={24} className={'shrink-0 w-6 h-6'}/>
							: <UserAvatarView user={user} className={'shrink-0 w-6 h-6'}/>
					}
				</div>
				
				{
					msg.type === MessageType.text ? (
						<article className={'w-full prose flex items-center gap-4 justify-between'}>
							
							<ReactMarkdown
								className={'grow'}
								remarkPlugins={[]}
								rehypePlugins={[
									[rehypeHighlight, { ignoreMissing: true }],
								]}
							>
								{msg.content}
							</ReactMarkdown>
							
							{
								msg.status === 'ERROR_TOKEN_DRAIN' && <Link href={routers.userPlanning.href}><Button>升级账号</Button></Link>
							}
						
						</article>
					) : (
						// <Image src={msg.content} alt={msg.content} width={256} height={256}/>
						<img src={msg.content} alt={msg.content} width={256} height={256}/>
					)
				}
			</div>
		</div>
	)
}
