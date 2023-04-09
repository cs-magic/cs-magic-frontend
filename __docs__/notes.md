# notes

## typography relative

### 渲染一些公式之类

不需要这些：`rehype-shiki remark-code-blocks @mapbox/rehype-highlight-code-block`

只需要：
- `react-markdown`, ref: https://www.npmjs.com/package/react-markdown
- `rehype-highlight`, ref: https://github.com/rehypejs/rehype-highlight
- `@tailwindcss/typography`, ref: https://tailwindcss.com/docs/typography-plugin

## flex relative

### `flex-end` 和 `scroll` 矛盾

css - Use justify-content: flex-end and to have vertical scrollbar - Stack Overflow, https://stackoverflow.com/questions/36130760/use-justify-content-flex-end-and-to-have-vertical-scrollbar

可以使用额外添加一个 `grow` 解决！

参考我们的代码：

## tailwind-css relative

### show sub-element when hovering

ref: https://stackoverflow.com/a/67401616/9422455

## secret

generate secret keys:

```shell
openssl rand -hex 32
```

ref: https://www.tecmint.com/generate-pre-shared-key-in-linux/

## 消息体设计

由于后端的 conversation 其实是不完整的（token超过的时候，会被 truncate），并且只有 role, content 两个字段，达不到前端显示信息完备度的要求，因此消息体选择全部由前端自行存储，后端只存储chatbot的一些内部信息。

具体地，前端需要手动实现 id, user, time, content 等信息，以及自行维护持久化。
