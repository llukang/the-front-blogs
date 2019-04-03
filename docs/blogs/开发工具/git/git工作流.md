## Git工作流

前端项目主要分为业务项目以及内部项目，两种类型的项目从发布流程到开发模式差异巨大，并不能使用某种通用的工作流方案，下面根据不同的项目特点引入不同的工作流.

#### 集中式工作流

适应项目特点：没有稳定的迭代计划，无测试的介入，维护频率较低，开发成员较少， 适应项目范围: 独立组件以及内部工具

工作方式：

- 远程分支： 远程分支只有origin/master 
- 项目初始化： 本地checkout origin/master分支 
- 本地开发： 使用本地master分支开发，push之前先rebase, 提交commit且review通过后直接push到origin/master分支 
- 发布方式： 直接使用master分支来执行npm 发布命令，发布后在指定的commit处添加tag标记，tag标记以package.json中的version一致


#### gitflow工作流

gitflow工作流通过为功能开发、发布准备和维护分配独立的分支，让发布迭代过程更流畅

适应项目特点：完善的测试上线流程, 稳定的迭代, 支持(dev&qa环境)独立部署的项目 使用项目范围：所有业务项目以及公共组件库

**稳定分支：**
- master分支 存储了正式发布的历史，作为线上环境最新代码
- develop分支 作为功能的集成分支, 开发环境最新代码

**功能分支**
- 由于前端大部分项目开发人员不多，建议以本地dev作为开发分支，如果需要同时开发多个功能而互不影响，可以从origin/dev checkout出新的功能分支，功能分支建议以`feature-xx`命名

**发布分支**

- 发布分支用于发布准备的专门分支，使得团队可以在完善当前发布版本的同时，继续开发下个版本的功能。 一旦dev分支上完成一次发布的所有功能(或者说临近上线日期)，就从dev分支上fork一个发布分支。 从这个时间点开始之后新的功能不能再加到这个分支上,这个分支只应该做Bug修复、文档生成和其它面向发布任务。 一旦对外发布的工作都完成了，发布分支合并到master分支并分配一个版本号打好Tag。另外，从新建发布分支以来的做的修改要合并回develop分支。

- 发布分支命名：`release-*` (建议以日期为标识符)

**hotfix分支**
- hotfix分支用于快速给产品发布版本（production releases）打补丁，让团队可以处理hotfix而不影响其他发布计划，这是唯一可以直接从master分支fork出来的分支。 修复完成，修改应该马上合并回master分支和dev分支（当前的发布分支），master分支应该用新的版本号打好Tag。

- hotfix分支命名: `hotfox-*`


### 示例

#### 创建开发分支

第一步从master分支创建dev分支，并push到服务器上

```bash
  git branch dev
  git push -u origin dev
```

#### 开发新功能

直接在dev分支上开发，如果需要同时开发多个功能，则从dev分支上创建新的feature分支

```git
  git checkout -b feature-xxx dev
  git status
  git add <some-file>
  git commit
```

#### 完成功能开发

- 如果是直接在dev分支上开发

  ```bash
    git pull --rebase
    git push
  ```

- 如果是在feature分支上开发，则合并回dev分支

  ```bash
    git checkout dev
    git merge feature-xxx
    git pull --rebase
    git push
  ```

#### 准备发布

- 从dev分支创建release分支并push到远处仓库

  ```bash
    git checkout -b release-20170912 dev
    git push origin release-20170912
  ```

- release分支bug修复
 
 直接在release分支上提交代码
 
    ```
    git checkout release-20170912
    git add some-file
    git commit -m "xxx"
    git pull --rebase
    git push
    ```

#### 完成发布
- 完成发布后，需要合并修改到master分支和develop分支上
  ```
    git checkout master
    git merge release-0.1
    git push
    git checkout develop
    git merge release-0.1
    git push
    git branch -d release-0.1
  ```

- 合并到master分支后，需要打好tag并push
  ```
    git tag -a 0.1 -m "Initial public release" master
    git push --tags
  ```


- 线上bug修复
发现线上处理Bug后，需要从master分支上拉出了一个hotfix分支，提交修改以解决问题，然后直接合并回master分支以及dev分支, 最终删除hotfix分支

  ```
    // Fix the bug
    git checkout -b hotfix-xxx master
    git checkout master
    git merge hotfix-xxx
    git push
    git checkout dev
    git merge hotfix-xxx
    git push
    git branch -d hotfix-xxx
  ```



#### 参考文档
[深入理解学习Git工作流](https://segmentfault.com/a/1190000002918123)