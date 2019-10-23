## Git submodule 使用

有种情况我们经常会遇到：某个工作中的项目需要包含并使用另一个项目。 现在问题来了：你想要把它们当做两个独立的项目，同时又想在一个项目中使用另一个。

Git 通过子模块来解决这个问题。 子模块允许你将一个 Git 仓库作为另一个 Git 仓库的子目录。 它能让你将另一个仓库克隆到自己的项目中，同时还保持提交的独立。

### 开始使用子模块

我们将要演示如何在一个被分成一个主项目与几个子项目的项目上开发。

通过在 git submodule add 命令后面加上想要跟踪的项目 URL 来添加新的子模块。默认情况下，子模块会将子项目放到一个与仓库同名的目录中。 如果你想要放到其他地方，那么可以在命令结尾添加一个不同的路径。

```bash
# 添加子模块 git 地址
git submoddule add <git registry> [path]
```

添加完成后生成`.gitmodules`文件， 该配置文件保存了项目 URL 与已经拉取的本地目录之间的映射.如果有多个子模块，该文件中就会有多条记录

```text
[submodule "src/demo"]
	path = src/demo
	url = git@gitlab.xiaoduoai.com:xiaoduo-npm/components.git
```

> `.gitmodules` 文件应该受到版本控制，它会和该项目的其他部分一同被拉取推送。 这就是克隆该项目的人知道去哪获得子模块的原因。

> 由于 .gitmodules 文件中的 URL 是人们首先尝试克隆/拉取的地方，因此请尽可能确保你使用的 URL 大家都能访问。 例如，若你要使用的推送 URL 与他人的拉取 URL 不同，那么请使用他人能访问到的 URL。 你也可以根据自己的需要，通过在本地执行 git config submodule.DbConnector.url <私有 URL> 来覆盖这个选项的值。 如果可行的话，一个相对路径会很有帮助。

### 克隆含有子模块的项目

当你在克隆这样的项目时，默认会包含该子模块目录,但是子模块目录为空。

```bash
#----方式一---
# 克隆主项目
git clone <mainProject>

# 初始化子模块配置文件
git submodule init

# 从子模块中拉取数据并检出主项目中合适的提交
git submodule update


# ---方式二---
# 简单初始化方式,采用递归方式，自动初始化并更新仓库每个子模块
git clone --recursive <mainProject>
```

### 在主项目上工作

拉取子模块修改

```bash
# ---方式一---
# 切换到子模块目录
git fetch
git merge origin/master

# ---方式二---
# 更新全部子模块
git submodule update --remote

# 更新指定子模块
git submodule update --remote <子模块name>
```

### 在子模块上工作

修改子模块内容并提交

```bash
# 主项目push前，先检查子模块是否提交
git push --recurse-submodules=check

# 主项目push前，先递归push子模块提交
git push --recurse-submodules=on-demand

```

如果那个子模块因为某些原因推送失败，主项目也会推送失败。

### 参考文档

[Git 工具 - 子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)
