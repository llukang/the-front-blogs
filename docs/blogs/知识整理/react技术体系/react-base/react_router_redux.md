## react-router-redux 总结

用于监听路由变更信息，并反馈到 `store`

使用实例：导航的选中

#### 常用 API 分析理解

`react_router_redux`的主要实现方式是，使用`redux` **中间件** ，注册`reducer`,监听`action` 调用 `history`库的相关方法；

- `routerMiddleware`

  ```javascript
  export default function routerMiddleware(history) {
    return () => next => action => {
      if (action.type !== CALL_HISTORY_METHOD) {
        return next(action);
      }

      const {
        payload: { method, args }
      } = action;
      history[method](...args);
    };
  }
  ```

- `routerReducer`

  ```javascript
  export function routerReducer(state = initialState, { type, payload } = {}) {
    if (type === LOCATION_CHANGE) {
      return { ...state, locationBeforeTransitions: payload };
    }

    return state;
  }
  ```

- `syncHistoryWithStore`

获取`store`中`routing`数据，注册监听`handleLocationChange`通知`redux`,重写`history.listen`方法。

- `routerActions`相关 API

`push, replace, go, goBack, goForward`与`history api` 使用相同
