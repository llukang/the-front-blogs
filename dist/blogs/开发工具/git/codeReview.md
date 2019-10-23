# Code Review

## Code Review 必要性

- **三人行必有我师**
- **高手之间的过招在细节**
- **是摒弃个人英雄主义的作坊式开发模式的有效手段**
- **是对代码可读性的考察**
- **可以提高代码质量**
- **是一种 mentor（传帮带）的有效途径**
- **保证不止一人对代码熟悉**
- **可以打造良好的技术氛围**
- **是一种沟通方式**
- **提高大家自律性**

## Code Review 最佳实践

### Architecture/Design

- 单一职责原则

  - 这是经常被违背的原则。一个类只能干一个事情, 一个方法最好也只干一件事情。 比较常见的违背是一个类既干 UI 的事情，又干逻辑的事情, 这个在低质量的代码里很常见。

- 行为是否统一

  - 比如缓存是否统一，错误处理是否统一， 错误提示是否统一， 弹出框是否统一 等等。

  - 同一逻辑/同一行为 有没有走同一 Code Path？低质量程序的另一个特征是，同一行为/同一逻辑，因为出现在不同的地方或者被不同的方式触发，没有走同一 Code Path 或者各处有一份 copy 的实现， 导致非常难以维护。

- 代码污染

  - 代码有没有对其他模块强耦合 ？

- 重复代码

  - 主要看有没有把公用组件，可复用的代码，函数抽取出来。

- Open/Closed 原则

  - 就是好不好扩展。 Open for extension, closed for modification.

- 面向接口编程 和 不是 面向实现编程

  - 主要就是看有没有进行合适的抽象， 把一些行为抽象为接口。

- 健壮性

  - 对 Corner case 有没有考虑完整，逻辑是否健壮？有没有潜在的 bug？

  - 有没有内存泄漏？有没有循环依赖?（针对特定语言，比如 Objective-C) ？有没有野指针？

  - 有没有考虑线程安全性， 数据访问的一致性

- 错误处理

  - 有没有很好的 Error Handling？比如网络出错，IO 出错。

- 改动是不是对代码的提升

  - 新的改动是打补丁，让代码质量继续恶化，还是对代码质量做了修复？

- 效率/性能

  - 客户端程序 对频繁消息 和较大数据等耗时操作是否处理得当。

  - 关键算法的时间复杂度多少？有没有可能有潜在的性能瓶颈。

  其中有一部分问题，比如一些设计原则， 可预见的效率问题， 开发模式一致性的问题 应该尽早在 Design Review 阶段解决。如果 Design 阶段没有解决，那至少在 Code Review 阶段也要把它找出来。

### Style

- 可读性

  - 衡量可读性的可以有很好实践的标准，就是 Reviewer 能否非常容易的理解这个代码。 如果不是，那意味着代码的可读性要进行改进。

- 命名

  - 命名对可读性非常重要，我倾向于函数名/方法名长一点都没关系，必须是能自我阐述的。

  - 英语用词尽量准确一点（哪怕有时候需要借助 Google Translate，是值得的）

- 函数长度/类长度

  - 函数太长的不好阅读。 类太长了，比如超过了 1000 行，那你要看一下是否违反的“单一职责” 原则。

- 注释

  - 恰到好处的注释。 但更多我看到比较差质量的工程的一个特点是缺少注释。

- 参数个数

  - 不要太多， 一般不要超过 3 个。

### Review Your Own Code First

- 跟著名的橡皮鸭调试法（Rubber Duck Debugging）一样，每次提交前整体把自己的代码过一遍非常有帮助，尤其是看看有没有犯低级错误。

### 如何进行 Code Review

- 多问问题。多问 “这块儿是怎么工作的？” “如果有 XXX case，你这个怎么处理？”

- 每次提交的代码不要太多，最好不要超过 1000 行，否则 review 起来效率会非常低。

- 当面讨论代替 Comments。 大部分情况下小组内的同事是坐在一起的，face to face 的 code review 是非常有效的。

- 区分重点，不要舍本逐末。 优先抓住 设计，可读性，健壮性等重点问题。

### Code Review 的意识

- 作为一个 Developer , 不仅要 Deliver working code, 还要 Deliver maintainable code.

- 必要时进行重构，随着项目的迭代，在计划新增功能的同时，开发要主动计划重构的工作项。

- 开放的心态，虚心接受大家的 Review Comments。

### 参考文档

- [Code Review 必要性](https://juejin.im/post/5c9740ba6fb9a071090d6a37)
- [Code Review 最佳实践](<https://mp.weixin.qq.com/s?__biz=MzIwMTQwNTA3Nw==&mid=400946871&idx=1&sn=5a125337833768d705f9d87ba8cd9fff&scene=1&srcid=0104FLyeXIS6N0EShgDseIfI&key=41ecb04b051110031290b34976240e650f0169d239c89f125162a89c8d3412f2087198612e71fd7685cae9eebe08e295&ascene=0&uin=MTYyMDMzMTAwMA%3D%3D&devicetype=iMac+MacBookPro11%2C5+OSX+OSX+10.10.5+build(14F1509)&version=11020201&pass_ticket=dc5bBckt1XSthRKTIsukYHIcAvKfv0jninbMlYQ5TWnE6XS%2FrRkdHKlJjNTI2Wsg>)
