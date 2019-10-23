## pm2 使用

### 概论

PM2 是带有内置负载平衡器的 Node.js 应用程序的生产过程管理器。它使您可以使应用程序永远保持活动状态，无需停机即可重新加载它们，并简化常见的系统管理任务。

### 安装

```bash
# 安装最新版pm2:
npm install pm2@latest -g

# 更新内存中的PM2
pm2 update

```

### 基本使用

```bash
# 显示所有进程状态
pm2 list

# 启动 app.js 并命名为 appName
pm2 start app.js --name appName

# 终止进程,通过 id 或 appName
pm2 stop appName

# 重启进程
pm2 restart appName

# 删除进程
pm2 delete appName

# 查看进程详情
pm2 show appName
pm2 describe appName

# 查看日志, 可选进程名称
pm2 logs

# 清空日志，可选进程名称
pm2 flush

```

### 服务器启动 pm2

服务器重启时，可以保存所有进程列表并在重新启动时恢复所有进程。

```bash

# 设置服务器启动时，启动pm2
pm2 startup [ubuntu|centos|gentoo|systemd]

# 保持现有应用程序，并想让它们保持服务器重启是启动
pm2 save
```

## 其他

```bash
# pm2 初始化配置文件,项目内
pm2 ecosystem

# 实时监控
pm2 monit

# 运行npm 命令
# pm2 运行 npm run dev
 pm2 start npm  --run test --name "myAPP"

```

### 参考链接

- [pm2 gitbook](https://wohugb.gitbooks.io/pm2/content/index.html)
