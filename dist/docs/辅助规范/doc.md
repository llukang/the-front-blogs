# 前端代码规范

统一代码规范，通过`eslint`执行静态检查

- [`ES5`代码规范](es5/es5.html)
- [`ES6`代码规范](es6/es6.html)
- [`React`代码规范](react/react.html)
- [`js` 代码注释](react/代码注释.html)

代码规范需要通过如下措施来保证实施效果:

- 统一`eslint`规则
- 提交代码前执行`eslint`检查
- 服务构建时执行`eslint`检查
- `code review`

### ESlint规则

配置`eslint`规则，并结合IDE插件，开发阶段自动提示.

统一使用前端组`eslint`规则: [eslint-config-hcb](http://git.56qq.com/frontend/engine/eslint-config-hcb)

安装依赖库

```javascript
"babel-eslint": "^7.2.3",
"eslint-config-hcb": "^1.0.2"
```

在项目中添加`.eslintrc`文件

```javascript
{
  "parser": "babel-eslint",
  "extends": "eslint-config-hcb",
  "rules": {},
  "globals": {}
}
```

### 提交`commit`前执行`eslint`检查

引入`husky`, 强制要求必须通过`eslint`检查才能提交`commit`

安装`husky`

```javascript

npm install husky --save-dev
// or 
yarn add husky --dev

```

配置`package.json`

```javascript
{
  "scripts": {
    "precommit": "eslint src",
  }
}
```


### 构建时执行`eslint`检查

引入`eslint-loader`, `webpack`构建时执行`eslint`检查, 检查失败则中断构建

安装`eslint-loader`

```shell
npm install eslint-loader --save-dev
```

修改`webpack`配置文件

```javascript

// atool-build+webpack1
webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || [];
webpackConfig.module.preLoaders.unshift({
  test: /\.js$/,
  exclude: /node_modules/,
  include: path.resolve(process.cwd(), 'src'),
  loader: "eslint-loader",
});

// webpack2+
module.exports = {
  // ...
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      },
    ],
  },
  // ...
}



```
