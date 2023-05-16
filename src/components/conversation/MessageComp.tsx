import { clsx } from 'clsx'
import { IconBrandOpenai, IconUser } from '@tabler/icons-react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { IMessage, MessageType } from '@/ds/openai/message'
import { PlatformType } from '@/ds/openai/general'
import { Skeleton } from '../ui/skeleton'
import { Popover, PopoverContent } from '../ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import remarkUnwrapImages from 'remark-unwrap-images'
import { useGetUserQuery } from '@/states/api/userApi'
import { skipToken } from '@reduxjs/toolkit/query'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const ChargeMessage = ({ content, classNames }: { content: string, classNames?: string }) => {
	const [_, pre, wechat, suf] = content.match(/(.*)\[(.*)\](.*)/)!
	return (
		<div className={clsx('grow', classNames)}>
			<span>{pre}</span>
			<Popover>
				<PopoverTrigger className={'text-pink-500 px-2'}>{wechat}</PopoverTrigger>
				<PopoverContent>xxx</PopoverContent>
			</Popover>
			<span>{suf}</span>
		</div>
	)
}

export const MessageComp = <T extends PlatformType>({ msg }: {
	msg: IMessage<T>
}) => {
	const { currentData: user } = useGetUserQuery(msg.sender !== 'openai' ? msg.sender : skipToken)
	
	return (
		<div className={clsx(
			'w-full border-b border-slate-200 dark:border-slate-700',
			!msg.status || msg.status === 'OK'
				? 'bg-slate-100 dark:bg-slate-800'
				// : msg.platform_params.role === MessageRoleType.user
				: 'bg-slate-200 dark:bg-slate-700',
			// : 'bg-red-500',
		)}>
			{/*// 这里直接copy的chatgpt居中的css*/}
			<div className="py-4 pl-2 pr-12 md:pr-0 flex gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl m-auto overflow-auto">
				
				<div className={'w-10 shrink-0 '}>
					<Avatar>
						<AvatarImage src={user?.basic.avatar ?? undefined}/>
						<AvatarFallback>{msg.sender === 'openai' ? <IconBrandOpenai/> : user?.id.slice(0, 2) ?? <IconUser/>}</AvatarFallback>
					</Avatar>
				</div>
				
				{
					msg.content === '' ? (
						<Skeleton className={clsx(
							msg.type === MessageType.text ? 'grow h-24' : 'w-[256px] h-[256px]',
						)}/>
					) : msg.type === MessageType.text ? (
						<article className={'grow prose dark:prose-invert break-words overflow-auto text-justify'}>
							{
								msg.status === 'ERROR_TOKEN_DRAIN'
									? <ChargeMessage content={msg.content}/>
									: <ReactMarkdown
										remarkPlugins={[
											remarkUnwrapImages, // ![]() --> <img>
										]}
										rehypePlugins={[
											[rehypeHighlight, { ignoreMissing: true }],
										]}
									>
										{msg.content}
									</ReactMarkdown>
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
