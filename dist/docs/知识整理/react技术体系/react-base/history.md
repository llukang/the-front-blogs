## history 总结


 ### 内部实现原理
  
  内部实现机制： **发布订阅模式** ，由 `listeners `,`appendListener`,`notifyListeners`组成
  

 ### 常用API分析理解

  - `createBrowserHistory ` 

    利用`html5 history API`，通过监听`window.addEventListener('popstate', handlePopState);`

  - `createHashHistory` 

    利用`hash hack`方式，通过监听`window.addEventListener('popstate', handleHashChange);`实现

  - `createMemoryHistory ` 

    主要用于非`dom`环境，如 `React Native`

  - `createLocation` 与 `locationsAreEqual`

    `createLocation` 主要用于通过`path,state`生成`location`对象

    `locationsAreEqual` 主要用于判断`location`对象是否发生变化

  - `parsePath` 与 `createPath`

    `parsePath`方法，主要用于`path`路由解析为`{pathname,search,hash}` `location`对象

    `createPath `方法，主要用于将`location`对象解析为`path`路径

### `history` 对象

  - `listen`

  ```javascript
      // 监听路由进入
      const unlisten = history.listen((location, action) => {
        // location is an object like window.location
        console.log(action, location.pathname, location.state)
      });

      // 取消监听
      unlisten();
  ```

  - `block`

    监听路由离开,配合`getUserConfirmation option`配置项，可实现页面离开提示

  ```javascript
      // 创建 history 对象
      const history = createHistory({
        // 监听页面对话
        getUserConfirmation(message, callback) {
          // callback(true)  // 允许离开当前页
          // callback(false) // 不允许离开当前页
        }
      })
      // 监听路由离开
      const unblock= history.block((location, action) => {
        return "Are you sure you want to leave this page?"
      });
      // 取消监听
      unblock()
  ```

  - 改变路由API

    `push,replace,go,goBack,goForward`

  - 其他
    
    `length` 主要记录`history`长度

    `action` 进入当前页面方式`POP/REPLACE`长度
    
    `location` 当前的`location`对象

    `createHref` 创建跳转`path`