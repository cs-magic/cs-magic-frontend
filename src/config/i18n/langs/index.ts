export const langs = ['en', 'zh-cn'] as const
export type LangType = typeof langs[number]

import 'moment/locale/zh-cn'
