import { GetServerSideProps } from 'next'
import { IChatgptRolePage } from '@/ds/openai/chatgpt'
import ChatgptNoRole from '@/components/chatgpt/role-index'
import ChatgptRole from '@/components/chatgpt/role'

export const ChatgptRolePage = (props: IChatgptRolePage) => {
	if (!props.act) return <ChatgptNoRole/>
	return <ChatgptRole {...props}/>
}

export default ChatgptRolePage

export const getServerSideProps: GetServerSideProps<IChatgptRolePage> = async (ctx) => {
	const query = ctx.query as unknown as IChatgptRolePage // todo: query string | string[], ref: https://stackoverflow.com/questions/66121256/why-are-next-js-req-query-objects-values-of-type-string-string
	return {
		props: {
			act: query.act || null,
			u: query.u || null,
			v: query.v || '1.0.0',
		},
	}
}
