## git 常用命令

本次采用问答的方式做个 Git 命令的简单

#### 基础问题

- 问题一：

  如何克隆远程代码到本地?

  ```bash
    $ git clone http://git.56qq.com/FE/staticBase.git
    $ git clone http://user:password@git.56qq.com/FE/staticBase.git
  ```

> 下面这种方法可以克隆远程代码到本地，设置你的提交账号和密码，如果采用上面的方法克隆代码，则每次提交需要输入账号和密码。（SSH 协议的可以直接拉取代码）。

> 额外的问题：我克隆代码忘了设置账号账号密码，之后提交不想每次输入账号密码怎么办?
> 更改文件：项目/.git/config，并且修改 remote "origin"的 url。

- 问题二：

  每次提交都需要用户名和邮箱，那么如何配置它们?

  ```bash
    $ git config --global user.name "username"
    $ git config --global user.email "username@56qq.com"
  ```

- 问题三：
  Git 的编辑器通常是 Vi 或者 Vim，用这不习惯，我想换个编辑器?

  ```bash
    $ git config --global core.editor emacs
  ```

- 问题四：
  Git 当前状态怎么理解?

  ```bash
    $ git status
  ```

  > 查看当前所在分支，本地的更改文件状态，与远程分支的关系（超前几笔提交，落后几笔提交）

- 问题五：
  怎么提交代码到本地分支?

  ```bash
    $ git add xxxxxx
    $ git commit
  ```

  > **备注:**
  > git add + 文件名：添加到索引库中
  > git add . : 添加所有更新的文件到索引库
  > git commit [-m"commit msg"]： 代码提交到本地分支

- 问题六：
  怎么推送代码远程分支?

  ```bash
    $ git push origin xxxxxx
  ```

  > **注意:**
  > 不建议的提交：从本地分支 1 推代码到远程分支 2；
  > 可行的提交：分支结构：本地分支 1 --&gt; 远程分支 1 ; 本地分支 2 从本地分支 1 切过来的，并且没有指向的远程分支，分支 2 是干净的（只有该功能的代码），则本地分支 2 可以推到远程分支 1。

- 问题七：
  如何切换分支 branchA --&gt; branchB，如何创建并切换到新分支?

  ```bash
    $ git checkout branchB
    $ git checkout -b newBranchC
  ```

  > 注意:

      1. 切换分支注意切换时Tree的位置，否则可能会产生commitId依赖

### Checkout 相关问题

- 问题一：
  我修改了 fileA，fileB，fileC 三个文件，但是只有 fileA 的修改是我想保留的，其他的修改舍弃?

  ```bash
    $ git checkout fileB fileC
  ```

### Branch 相关问题

- 问题一：
  怎么查看本地分支远程分支?

  ```bash
    $ git branch -r
  ```

- 问题二：
  怎么查看本地分支和远程分支的指向关系，以及最后一笔提交 commit msg?

  ```bash
    $ git branch -vv
  ```

- 问题三：
  怎么新建分支?

  ```bash
    $ git branch -b xxxxxxx
  ```

- 问题四：
  怎么删除分支?

  ```bash
    $ git branch -d xxxxxxx
    $ git branch -D xxxxxxx
  ```

  > -d 和-D 都可以删除分支，-d 删除时会考虑一些 merge 的因素，Not full merge 会删除失败，-D 代表强制删除

### Pull 相关问题

- 问题一：
  如何更新本地分支代码

  ```bash
   $ git fetch origin master:tmp
   $ git diff tmp $ git merge tmp
   $ git pull --rebase
  ```

  > 上面的方法（方法 1）是较为安全的更新方式，下面的方法（方法 2）更为简单：

  1. 方法 1 先获取远程 master 代码到本地，生成记录为 tmp，然后比较本地 master 分支代码和 tmp，最后自己决定是否合并到本地分支。

  2. 方法 2 是根据分支指向结构直接更新代码到最新

  3. 不建议的方法：直接 git pull，Tree 会分叉，生成菱形的 Tree

  4. 方法 2 可能报错：You asked me to pull without telling me which branch you want to merge with, and 'branch.my_branch.merge' in your configuration file does not tell me, either. 你需要设置 merge 的分支结构

  ```
  git branch --set-upstream dev origin/dev
  ```

### Diff 相关问题

- 问题一：
  文件比较

  ```bash
    $ git diff $ git diff --cached
    $ git diff commitId1 commitId2
  ```

  > **解释：**

  1. 查看尚未暂存的文件更新了哪些部分
  2. 查看已经暂存起来的文件
  3. 查看两笔 commit 之间的差异

### Reset 相关问题

- 问题一：
  我更改了 fileA，fileB，我只想 add fileA，但是手贱加了 fileB，怎么办?

  ```bash
    $ git reset HEAD fileB
  ```

- 问题二：
  我提交了一笔 commit1 到本地分支，仔细一看发现是手贱提交错了，怎么办?

  ```bash
  $ git log
  $ git reset [--soft] [--hard] commitId
  ```

  > 先寻找想要指针回到的 commitId，然后 reset 回去。
  > --soft 代表我想保留那笔更改并且提交的代码
  > --hard 代表我想舍弃那笔更改并且提交的代码

### Revert 相关问题

- 问题一：
  我提交了一笔 commit1 到本地分支，然后又推到了远程分支，后来产品说去掉这个功能，怎么办?

  ```bash
    $ git log $ git revert commitId
  ```

  > 生成一笔与 commit1 相反的提交，然后提交到远程分支。

### merge 代码

- 只介绍一种比较推荐的方式 merge 代码（建议本地分支 merge 本地分支），可以适用于 Gerrite。

  ```bash
    $ git checkout branch1
    $ git pull --rebase
    $ git checkout branch2
    $ git pull --rebase
    $ git merge branch1
    $ git push origin branch2
  ```

  > 两个分支都更新最新的代码，然后把 branch1 合并到 branch2（Gerrite 上建议使用--no-ff 合并），最后把代码推到远程分支

### 冲突处理

- 情况一：
  stash 的冲突（最易解决的冲突），冲突发生在 stash pop 出来时（备份的代码和当前分支代码的冲突） 修改所有冲突后，git add 所有 both modify 的文件，然后在用上面的 reset HAED . 返回到未 add 的状态

  ```bash
    $ git add .
    $ git reset HAED .
  ```

- 情况二：
  rebase 的冲突，冲突发生在 pull --rebase 时（本地提交的代码和远程分支代码的冲突）修改所有冲突后，然后 add 和 rebase --continue 提交就可以了

- 情况三：
  merge 的冲突（最易出错），冲突发生在 merge 时，修改所有冲突后，然后 add 和 commit 就可以了。只能是`git commit` ，commit 后面不能接参数

- 其他：
  代码冲突时会把你放在一个其他的分支或者 merging 状态，此时考虑冲突原因，然后考虑正确的解决方法。

### 其他问题

- 问题一：
  本地已经有了更改，怎么拉取远程分支上最新的代码?

  ```bash
    $ git stash
    $ git pull --rebase
    $ git stash pop
  ```

  > 直接拉取会报错，先备份本地更改，然后拉取最新代码，最后把备份的代码和本地更新后的代码合并。
  > 正因为都没有 commit 相关的，git 操作出错的几率低，即使操作出错，处理也简单，建议多人开发同一时间上线的同一项目使用一个分支管理。

- 问题二：
  本地已经有了更改，当我准备提交时发现代码在 master 分支上，不在我想要的那个分支?

  ```bash
    $ git stash
    $ git checkout my_wanted_branch
    $ git stash pop
  ```

  > 备注：

  1. 为什么不直接提交上去，然后 push 到 my_wanted_branch？同基础问题六（甚至很多大型项目是禁止这样推代码），他可能会带上一些不生成提交管理的代码，到时如果 revert 会发现代码回滚不干净，而且很难查找原因。

- 问题三：
  本地提交代码到了 master，不是我想要提交到的那个远程分支，即代码提交错了分支?

  ```bash
    $ git reset --soft commitId #（上一笔提交commitId）
    $ git reset HEAD .
    $ git stash
    $ git checkout my_wanted_branch
    $ git stash pop
    $ git add .
    $ git commit
    $ git push origin my_wanted_branch·
  ```

  ```bash
    $ git checkout my_wanted_branch
    $ git cherry-pick commitId #（那笔提交错了分支的commitId）
    $ git push origin my_wanted_branch
    $ git checkout master
    $ git reset --hard commitId #（上一笔提交commitId）
  ```

  > 解释：
  > 方法 1：先取消提交，然后切换分支再提交到正确的分支。
  > 方法 2：把那笔错误的提交 pick 到正确的分支，然后去 master 分支干掉那笔错误的提交。
  > 建议使用方法 1，方法 2 有时会忘记去掉 master 分支上那笔提交，更容易出错。

- 问题四：
  本地已经提交了 commit1 到 branch1，然后发现我少提交了一个文件，或者 commit msg 写得不好？

  ```bash
    $ git add newfile
    $ git commit --amend
  ```

  > 解释：
  > commit --amend 继续在上一笔提交中追加内容

- 问题五：
  继续问题四，我只改了一下 commit msg，然后 push 时报错 error missing tree（Gerrite 中常见，其它不常见）？

```bash
  $ git push origin --no-thin branch1
```

### 总结

操作很简单，但是头脑要清楚。要在哪个分支上修复 Bug，要暂存哪个地方的内容，之后修复完了在那个地方提交，然后要到哪个分支上面恢复工作区，都是需要注意的，否则，很容易造成提交图混乱。只有弄清楚了工作流程，才不容易出错。
