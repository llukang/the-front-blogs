## git rebase 工作流

不强制，有风险,可能丢失提交纪录

使用示例:

```bash
# 同步 feature-1.2.4
git:(llk-dev-v.1.2.4) git rebase origin/feature-1.2.4

# 合并重复提交并解决冲突
git add
git rebase --continue

# 因为 rebase 修改了commit 历史，只能强制提交（危险）
git push -f
```

#### 同步其他分支代码

```bash
git:(feature1) git rebase master
```
