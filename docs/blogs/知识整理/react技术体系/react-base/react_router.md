## react-router 总结

### `react-router` 与 ``react-router-dom`` `react-router-native` 关系

`react-router-dom`依赖`react-router`，所以我们使用`npm`安装依赖的时候，只需要安装相应环境下的库即可，不用再显式安装`react-router`。基于浏览器环境的开发，只需要安装`react-router-dom`；基于`react-native`环境的开发，只需要安装`react-router-native`。`npm`会自动解析`react-router-dom`包中`package.json`的依赖并安装。

### `react-router` 常用API
  - `BrowserRouter` 

    对`<Router/>`组件进行二次封装，使用`history`库中的`createBrowserHistory`;

  - `HashRouter ` 

    对`<Router/>`组件进行二次封装，使用`history`库中的`createHashHistory`;

  - `StaticRouter`

    服务器端渲染用

  - `MemoryRouter` 

    非浏览器环境渲染

  - `Router` 

    主要作用是将`router`相关信息存储到`Context`中

  - `Switch`

    主要作用获取`context router`相关信息，并与`children route `进行匹配比较并返回

  - `Route`

    渲染路由匹配规则组件，优先级为`component`,`render`,`children `,`null`

  - `Redirect` 

    通过路由匹配规则判断是否执行`history.push(to)` `history.replace(to)`

  - `Link` 

    内部实现 `<a {...props} onClick={this.handleClick} href={href} ref={innerRef} />`

  - `NavLink`

    内部实现 `<Route><Link></Link></Route> `

  - `Prompt `
      用于在导航离开公共API之前提示用户的公共API，用于在使用组件离开屏幕之前提示用户。
      未查询到相关使用实例

  - `generatePath` 

    用于从模式和参数生成URL路径名

  - `matchPath ` 

    判断指点路由与目标路由关系

  ```javascript
    // 使用方式
    const match = matchPath('/users/123', {
      path: '/users/:id',
      exact: true,
      strict: false
    });
    // 返回值
    const result={
      path, // the path pattern used to match
      url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
      isExact, // whether or not we matched exactly
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  ```

  - `withRouter` 
  通过`withRouter`高阶组件访问历史对象的属性。暴露`router`相关信息
  
 ### `react-router` 常见问题

 **问题1：url更新，页面组件未更新**

> 问题描述：

```javascript
  <Router>
    <Layout> // 嵌套一层 layout 
      <Switch>
        <Route path="/page1" component={Counter} />
        <Route path="/page2" component={Page2} />
      </Switch>
    </Layout>
  </Router>
```

> 解决方案

```
  withRouter(Layout);
```