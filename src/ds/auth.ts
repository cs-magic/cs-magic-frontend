export interface IProvider {
	id: string;
	name: string;
	type: string;
	
	[k: string]: string;
}


export interface IUserBase {
	username: string
	password: string
}

export interface IUserLogin extends IUserBase {
	scope?: string
}

export interface IUserGrantToken extends IUserBase {
	grant_type?: string
}

export interface IUserRegister extends IUserBase {
	email?: string
	phone?: string
	invitation?: string
}

export interface ITokenData {
	access_token: string
	token_type: 'Bearer'
}
