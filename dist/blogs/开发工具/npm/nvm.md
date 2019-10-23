## nvm 使用

### 概论

node 版本管理器 - 用于切换 node 版本

### 安装

```bash
# window 安装
#参考链接

# mac
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

### 使用

```bash
# 列出 可安装版本
nvm list available

# 安装 版本
nvm install 4.4.4

# 卸载 版本
nvm uninstall 6.2.0

# 列出 已安装版本
nvm list

# 切换 版本
nvm use 7.2.0

```

### 解决 nvm 无法切换源

```bash
nvm use 8.0.0
Now using node v8.0.0 (64-bit)
# 这个提示正常来讲是切换成功的

node -v
v7.6.4
# 还是原来版本
```

> 卸载原有的 node 包

### 解决 nvm 下载慢的问题

在程序安装目录下找到 settings.txt

```text
root: C:\Program Files\nvm
path: C:\Program Files\nodejs
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

### 参考链接

- [nvm window 下载](https://github.com/coreybutler/nvm-windows)
