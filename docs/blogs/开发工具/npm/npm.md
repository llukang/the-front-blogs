## npm 镜像配置

#### npm, yarn查看源和换源

```bash
  npm config get registry  # 查看npm当前镜像源

  npm config set registry https://registry.npm.taobao.org/  # 设置npm镜像源为淘宝镜像

  yran config get registry  # 查看yarn当前镜像源
  
  yarn config set registry https://registry.npm.taobao.org/  # 设置yarn镜像源为淘宝镜像
```

#### 常用镜像地址
 
```bash
  npm --- https://registry.npmjs.org/

  cnpm --- https://r.cnpmjs.org/

  taobao --- https://registry.npm.taobao.org/

  nj --- https://registry.nodejitsu.com/

  rednpm --- https://registry.mirror.cqupt.edu.cn/

  npmMirror --- https://skimdb.npmjs.com/registry/

  deunpm --- http://registry.enpmjs.org/
```

#### 临时切换源

- 指定源地址

```bash
  npm --registry https://registry.npm.taobao.org install express
```

- 添加临时`alias`

```bash
  alias mnpm="npm --registry=http://npm.uedlinker.com"

  mnpm i react
```

#### 持久使用

- `npm` 默认源配置修改
  
```bash
  npm config set registry https://registry.npm.taobao.org

  npm config get registry // 配置后可通过下面方式来验证是否成功
  
  npm info express
```

- `alias` 参数的使用

```bash
  # 找到 `.zshrc`或 `.bashrc` 文件添加垫子
  alias mnpm="npm --registry=http://npm.uedlinker.com"
```

或执行命令

```bash
  alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"
```
