# bugfix

## todo: 关于`createSlice`无法自动 infer state

### 暂时的解决方案

安装了 `@types/redux`后就可以了，但是会报：`Redux provides its own type definitions, so you don't need @types/redux installed!`。

匪夷所思的是之前的项目都不用装这个。。。

