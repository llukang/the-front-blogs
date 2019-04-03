## react virtual Dom

### 概论

  虚拟DOM是在DOM的基础上建立了一个抽象层，对数据和状态所做的任何改动，都会被自动且高效的同步到虚拟DOM，最后再批量同步到DOM中。

  在React中，render执行的结果得到的并不是真正的DOM节点，而仅仅是JavaScript对象，称之为虚拟DOM。

  虚拟DOM具有批处理和高效的Diff算法，可以无需担心性能问题而随时“刷新”整个页面，因为虚拟DOM可以确保只对界面上真正变化的部分进行实际的DOM操作。

### 虚拟DOM原理

  - **render 虚拟DOM**
  - **diff 虚拟DOM**
  - **更新必要的 DOM 元素**


### 常见问题

  - 首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比 `innerHTML` 插入慢。
  - 

### 参考文档
  - [博客文章](https://blog.csdn.net/zhouziyu2011/article/details/71171567)