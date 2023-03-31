# notes

## 消息体设计

由于后端的 conversation 其实是不完整的（token超过的时候，会被 truncate），并且只有 role, content 两个字段，达不到前端显示信息完备度的要求，因此消息体选择全部由前端自行存储，后端只存储chatbot的一些内部信息。

具体地，前端需要手动实现 id, user, time, content 等信息，以及自行维护持久化。
