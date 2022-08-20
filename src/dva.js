dva：
概念：数据流解决方案
大的状态框管理库主要就是：redux、mobx（dva不算，dva只是用到了redux）

dva好久没更新了
做的东西并不多，基于别的框架弄了一个新的model出来
redux和redux-saga的数据流方案，为了简化开发体验，还内置了react-router，和fetch，也可以说是一个轻量级的应用框架

出现背景：
以前用redux：
一个页面要涉及到很多文件：页面本身、store的index和reducer文件、action(saga)
bug不好找，改文件费力

dva：核心思想：把reducer、initialState、action、saga封装到一个model中
现在我们只需要关注主页面也model文件就可以了