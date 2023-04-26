# Version History

## v0.5.2 (2023-04-26)

- [x] :boom: 已支持chatgpt会话中基于markdown显示图片（需要合适的引导），具体参考此图：

![chatgpt-image-response.png](/screenshots/chatgpt-image-response.png)

- [x] fixed chatgpt response problem triggered via `setLastMessage`

## v0.5.1 (2023-04-25)

- [x] :boom: 对后端进行了部分重构，以支持微信终端（即将上线）
- [x] 修复了由于返回数据结构失配导致的 client side error
- [x] 优化了token drain时的逻辑与提示，它相当友好了！
- [x] 修复了sse升级后导致的token不刷新的问题
- [x] 优化了一些局部UI的呈现
- [x] :sob: 修复了dalle收发包不匹配、消息重复等问题

## v0.5.0 (2023-04-24)

- [x] :boom: 实现了 SSE 标准的 chatGPT 回复，将互动体验达到了业内标准水准
- [x] maintained multi-language schemas

## v0.4.1 (2023-04-24)

- [x] 修复并升级了登录系统，弄明白了一个很艰深的bug（至此，登录系统将高可用，尽管离最佳设计还有一段路要走）
- [x] 修复并统一了多主题与多语言的组件
- [x] 彩色小魔杖 :magic_wand: 登场~
- [x] 支持与github自动同步versions
- [x] 修复境内网无法访问versions page的问题

## v0.4.0 (2023-04-23)

- [x] 取消多主题，使用更稳健的双主题
- [x] 重构前端UI框架，全面弃用 daisyUI，全面使用 radix
- [x] 对其他页面的部分设计做了调整，尤其是导航栏

## v0.3.1 (2023-04-22)

- [x] :boom: 日语支持

## v0.3.0 (2023-04-21)

- [x] :boom: 增加了中英切换
- [x] :boom: 增加了多主题切换

## v0.2.3 (2023-04-20)

- [x] 增加了token不足时的升级引导

## v0.2.2 (2023-04-19)

- [x] 修复 dalle 接口免额问题
- [x] 实现消息发送后自动更新token剩余值
- [x] 更好的token栏显示效果，并基于chatGPT的代码增加了动画

## v0.2.1 (2023-04-18)

- [x] 修复架构升级导致的留言墙不可用问题
- [x] 修复报错无内容的问题，现在统一把锅丢给openai了:)

## V0.2.0 (2023-04-17)

- [x] 使用Generic手段重构了前后端的ChatGPT, Dalle接口！
- [x] Full RTK Query !
- [x] 对话中更好的错误提示

## V0.1.7 (2023-04-15)

- [x] 向前对齐了user数据库的数据
- [x] 修复了头像显示问题、fallback问题
- [x] 调研在其他区域点击第一次会focus menu的问题（未能复现）

## V0.1.6 (2023-04-14)

- [x] 对接mid journey或dalle：
- 聊天：cs-magic.com/apps/chatGPT
- 画图：cs-magic.com/apps/dalle

## V0.1.5 (2023-04-13)

- [x] 升级了服务器磁盘
- [x] 更合理的会员计划
- [x] 修复了后端chatgpt token接口
- [x] 修复了前端chat界面昨晚写的bug
- [x] 
  研究备案（国内域名cs-magic.cn已注册通过实名验证，正在等待三天后的 [备案](https://beian.aliyun.com/pcContainer/formpage?page=selfBa&pageAction=init&orderType=100)
- [x] [pr list](https://cs-magic.com/wall-messages)
- [x] implemented separate title for each page

## V0.1.4 (2023-04-12)

- [x] 支持google analysis
- [x] [DECLINE] 支持当前会话搜索 （这个直接用网页自带的搜索功能就可以……）
- [x] [DECLINE] 支持移动端长按会话弹窗（这个不需要，单击就会有修改、删除提示，然后再点击就可以操作了）
- [x] [OPTIONAL] 优化移动端固定高度（这个并不一定要做，因为会导致屏幕更挤一些，但确实实现了）
- [x] 优化登陆按钮提示（这个中午就做完了）
- [x] 支持version history（基于 mdx 实现了，ref: [using-mdx](https://nextjs.org/docs/advanced-features/using-mdx)）
- [x] ~~支持pr list4-14完成）~~
