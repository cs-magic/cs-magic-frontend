import { ID } from '@/ds/general'
import { IMessage } from '@/ds/openai/message'
import { PlatformType } from '@/ds/openai/general'
import { baseApi } from '@/api/baseApi'

export const TAG_MESSAGE = 'message'


export const injectOpenAIMessages = <T extends PlatformType>() => baseApi
	// ref: https://github.com/reduxjs/redux-toolkit/issues/1510#issuecomment-1122564975
	.enhanceEndpoints({
		addTagTypes: [TAG_MESSAGE],
	})
	
	.injectEndpoints({
		endpoints: (builder) => ({
			// 实时聊天就不要一直重置刷新了，主要是涉及到了客户端和服务端双层的信息
			listMessages: builder.query<IMessage<T>[], { conversation_id: ID, platform_type: T }>({
				query: (arg) => `/${arg.platform_type}/${arg.conversation_id}/messages`,
			}),
			
			sendMessage: builder.mutation<IMessage<T>, IMessage<T>>({
				query: (arg) => ({ url: `/${arg.platform_type}/${arg.conversation_id}/chat`, method: 'post', body: arg, }),
			}),
		}),
		overrideExisting: false, // 这个必须加，否则没hook，ref: https://redux-toolkit.js.org/rtk-query/usage/code-splitting
	})


/**
 * 尽管我们已经写成了Generic形式，但是我们还是得分别写其派生的代码，而不能基于变量动态地确定函数……简直鸡肋！
 */
const {
	useListMessagesQuery,
	useSendMessageMutation,
} = injectOpenAIMessages()


