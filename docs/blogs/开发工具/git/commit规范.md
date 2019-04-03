##  commit规范指引

### 示例

```
 // feat(op-11):新增用户中心列表页详情页
  type(scope): subject 
  // 空一行
  body
  // 空一行
  footer

```



###  1. type（必填）

类型包括： 
1. feat：新功能（feature）
2. fix：修补bug
3. docs：文档（documentation）
4. style： 格式（不影响代码运行的变动）
5. refactor：重构（即不是新增功能，也不是修改bug的代码变动）
6. test：增加测试
7. chore：构建过程或辅助工具的变动

### 2. scope （必填）

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

### 3. subject （必填）

1. commit 目的的简短描述，不超过50个字符
1. 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
2. 第一个字母小写
3. 结尾不加句号（.）
4. 如果没有TAPD号，则不用填[TAPD-ID]

### 4. Body （选填）

Body 部分是对本次 commit 的详细描述，可以分成多行。有两个注意点。
1. 使用第一人称现在时，比如使用change而不是changed或changes。 
2. 应该说明代码变动的动机，以及与以前行为的对比。

### 5. Revert

特殊情况:如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header。
```
// revert: feat(pencil): add 'graphiteWidth' option
// This reverts commit 667ecc1654a317a13331b17617d973392f415f02.

```