## git 规范工具

优雅的提交 Git Commit Message

### Commit Message 格式

#### 示例

```bash
  # 格式
  type(scope): subject
  // 空一行
  body
  // 空一行
  footer

  # 实例
  feat:新增用户中心列表页详情页[op-11]
  fix: 修复用户中心分页bug[om-121]
  docs: 完善HTable组件相关文档
  style: 调整用户中心搜索按钮
```

#### 1. type（必填）

类型包括：

1. feat：新功能（feature）
2. fix：修补 bug
3. docs：文档（documentation）
4. style： 格式（不影响代码运行的变动）
5. refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
6. test：增加测试
7. chore：构建过程或辅助工具的变动

#### 2. scope （必填）

scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

#### 3. subject （必填）

1. commit 目的的简短描述，不超过 50 个字符
1. 以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
1. 第一个字母小写
1. 结尾不加句号（.）
1. 如果没有 TAPD 号，则不用填[TAPD-ID]

#### 4. Body （选填）

Body 部分是对本次 commit 的详细描述，可以分成多行。有两个注意点。

1. 使用第一人称现在时，比如使用 change 而不是 changed 或 changes。
2. 应该说明代码变动的动机，以及与以前行为的对比。

#### 5. Revert

特殊情况:如果当前 commit 用于撤销以前的 commit，则必须以 revert:开头，后面跟着被撤销 Commit 的 Header。

```
// revert: feat(pencil): add 'graphiteWidth' option
// This reverts commit 667ecc1654a317a13331b17617d973392f415f02.

```

### 格式化工具

#### 全局安装

```bash
# 安装
npm install -g commitizen cz-conventional-changelog

# 配置
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc

# 使用
git cz
```

#### 局部安装

```bash
# 安装
npm install -D commitizen cz-conventional-changelog

# 配置 package.json`
"script": {
 "commit": "git-cz",
},
"config": {
 "commitizen": {
   "path": "node_modules/cz-conventional-changelog"
 }
}

# 使用
npm run commit
```

### 提交信息校验

```bash
# 安装
npm install --save-dev @commitlint/config-conventional @commitlint/cli husky

# 配置 commitlint.config.js
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# 配置 package.json
 "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }

# 或 配置 .huskyrc
{
  "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
}

# 使用
git commit -m "不符合规范提交"
```
