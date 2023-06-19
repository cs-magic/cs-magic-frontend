export enum AuthWay {
	byBackend,
	byNextAuth, // NextAuth暂时废弃，原因是国内的登录服务与NextAuth不太兼容，手动实现email verification也比较麻烦
}

export const AUTH_WAY: AuthWay = AuthWay.byBackend
