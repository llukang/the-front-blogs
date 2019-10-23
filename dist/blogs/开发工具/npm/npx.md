## npx 使用

### 概论

`node` 自带 `npm` 模块，所以可以直接使用 `npx` 命令。万一不能用，就要手动安装一下。

`npx` 想要解决的主要问题，就是调用项目内部安装的模块。

```bash
npm install -g npx
```

### 调用项目内部 安装的模块

```bash
# 安装 内部依赖
npm install -D eslint

# 调用 内部依赖
node-modules/.bin/eslint --version

npx eslint --version
```

npx 的原理很简单，就是运行的时候，会到 node_modules/.bin 路径和环境变量\$PATH 里面，检查命令是否存在。

注意，Bash 内置的命令不在\$PATH 里面，所以不能用。比如，cd 是 Bash 命令，因此就不能用 npx cd。

### 避免全局安装模块

```bash
# npx 后面的模块无法在本地发现，就会下载同名模块
npx create-react-app my-react-app

#强制使用本地模块，不下载远程模块
npx create-react-app my-react-app  --no-install

#忽略本地的同名模块，强制安装使用远程模块
npx create-react-app my-react-app  --ignore-existing

#使用模块不同版本的指定版本
npx node@0.12.8 -v

#执行 GitHub 源码
npx github:piuccio/cowsay hello

```

npx 将 create-react-app 下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载 create-react-app

### 参考链接

- [npx 使用教程
  ](http://www.ruanyifeng.com/blog/2019/02/npx.html)
- [npx](https://www.npmjs.com/package/npx)
