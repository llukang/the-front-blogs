## npm 使用

### 镜像管理

推荐使用 `nrm` 管理 镜像地址

#### 查看与配置

```bash
  npm config get registry  # 查看npm当前镜像源

  npm config set registry https://registry.npm.taobao.org/  # 设置npm镜像源为淘宝镜像
```

#### 临时切换源

```bash

  npm install express --registry https://registry.npm.taobao.org

  # 添加临时`alias`(mac)
  alias mnpm="npm --registry=http://npm.uedlinker.com"
  mnpm i react
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
