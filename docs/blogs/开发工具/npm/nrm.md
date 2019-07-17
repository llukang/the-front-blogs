## nrm 镜像管理

npm 包有很多的镜像源，有的源有的时候访问失败，有的源可能没有最新的包等等，所以有时需要切换 npm 的源，nrm 包就是解决快速切换问题的。
nrm 可以帮助您在不同的 npm 源地址之间轻松快速地切换。

### 安装

```bash
  npm install -g nrm
```

### 使用

- 查看镜像列表

```bash
  nrm ls

#   npm ---- https://registry.npmjs.org/
#   cnpm --- http://r.cnpmjs.org/
# * taobao - https://registry.npm.taobao.org/
#   nj ----- https://registry.nodejitsu.com/
#   rednpm - http://registry.mirror.cqupt.edu.cn/
#   npmMirror  https://skimdb.npmjs.com/registry/
#   edunpm - http://registry.enpmjs.org/
```

- 添加镜像

```bash
  nrm add <registry> <url>
```

- 删除镜像

```bash
  nrm del <registry>
```

- 切换镜像

```bash
  nrm use <registry>
```

- 访问镜像首页

```bash
  nrm home <registry>
```

### 其他

```bash
 # 查看npm当前镜像源
  npm config get registry

 # 设置npm镜像源为淘宝镜像
  npm config set registry https://registry.npm.taobao.org/
```
