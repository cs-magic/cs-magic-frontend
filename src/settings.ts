import { IUser } from '@/ds/chat'

export const CHATGPT_ROLE_ACT_DEFAULT = 'default'
export const CHATGPT_ROLE_PROMPT_DEFAULT = 'You are a helpful assistant.'

export const AVATAR_SAMPLE_URI = '/avatar/sample.jpg'

export const USER_OPENAI: IUser = {
	id: 'openai',
	name: 'OpenAI',
	avatar: '/logo/openai.png',
}
