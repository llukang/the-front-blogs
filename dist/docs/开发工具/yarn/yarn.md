## yarn 基本使用

## 概述
 - 解决由于语义版本控制而导致的npm安装的不确定性问题
 - 重新设计的客户端,使得运行速度得到了显著的提升，整个安装时间也变得更少
 - 使用本地缓存,无需互联网连接就能安装本地缓存的依赖项，提供了离线模式

> 注意：通常情况下不建议通过npm进行安装。npm安装是非确定性的，程序包没有签名，并且npm除了做了基本的SHA1哈希之外不执行任何完整性检查，这给安装系统程序带来了安全风险。

## yarn 安装

  - 下载`.msi`安装文件
  - 通过 `Chocolatey` 安装
  ```
    choco install yarn
  ```
  - 通过 `npm` 命令安装(不推荐,npm安装带有不确定性)
  ```
    npm install --global yarn
  ```
  >  验证安装结果 `yarn --version`

## yarn 使用

  - 初始化项目
    ```
      yarn init // 生成 `package.json` 
    ``` 
    
  - 添加依赖包
    ```
      yarn add [package]@[version] // 局部安装
      yarn add [package]@[version] [--dev/-D] // 安装到开发依赖
      yarn global add [package]  // 全局安装
    ```
    
  - 更新依赖包
    ```
      yarn upgrade [package]@[version] // 更新指定包
      yarn upgrade // 删除node_modules && npm install
    ```

  - 删除依赖包
    ```
      yarn remove [package] // 移除依赖包
    ```

  - 安装所有依赖包
    ```
      yarn or yarn install // 安装全部依赖
      yarn install --force // rebuild 安装包
    ```

  - 清除缓存
    ```
      yarn cache clean
    ```

## 其他知识
  - `package.json`

    [package.json 详解链接](https://www.cnblogs.com/tzyy/p/5193811.html#_h1_28)

  - `yarn.lock`

    保证在不同机器上得到一致的安装结果，存储每个安装的依赖包的 **准确的版本号**
    - 由 `Yarn` 管理 `yarn.lock` 文件,不要直接编辑这个文件
    - 提交到版本控制系统

## 参考文档
  - [yarn中文](https://yarn.bootcss.com)
  - [package.json 详解链接](https://www.cnblogs.com/tzyy/p/5193811.html#_h1_28)
  