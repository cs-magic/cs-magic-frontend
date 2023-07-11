export enum ChatgptRoleType {
	system = 'system',
	user = 'user',
	assistant = 'assistant'
}


export interface IChatgptMessageParams {
	role: ChatgptRoleType
}

export interface IChatgptPrompt {
	role: ChatgptRoleType
	content: string
}

/**
 * 目前model是属于conversation级别的
 * 但后续也可以降级为message级别哦~
 */
export enum ChatgptModelType {
	gpt35 = 'gpt-3.5-turbo',
	gpt4 = 'gpt-4',
}

export interface IChatGPTConversationParams {
	model: ChatgptModelType,
	system_prompt: string
	// selected: ID[]
}


export interface ICallChatgpt {
	model: ChatgptModelType
	prompts: IChatgptPrompt[]
}

export interface IChatgptRole {
	act: string
	prompt: string
}

export interface IChatgptRolePage {
	act: string | null
	u: string | null
	v: string
}
