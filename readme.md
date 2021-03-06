# 软工大作业前端编写说明

### 技术使用

- vue2
- element-ui
- 在C60/frontend/package.json文件中可以查看使用的版本

### 命名

- 组件、视图、变量等的命名原则是通过名字可以明确知道其代表的意义，命名不需要简洁，追求清晰。

### 代码编写

- 我们的代码结构是每个视图内实现具体的功能组，不同的视图通过主界面的按钮进行跳转。所以视图内部不需要处理视图的跳转（比如返回键），只完成所需的功能。当然，视图内可能需要不同的子路由，按需决定。


- 我们每个人负责相对独立的一部分功能，因此在自己负责的部分，推荐使用组件，将组件挂载在视图上，方便代码复用和调试，尽量不要在视图上直接编写代码。
- 将工作分成两部分：先实现所有的功能，然后再进行界面优化。也就是写代码时先不用管css部分，也不用加id、class之类的标识。最后全部代码统一进行界面优化。

### 仓库管理

- 每个人在自己的dev分支开发，经共同检查后再合并至main分支。