## Redux 总结


### redux 概论
  `redux` 三大要素 **`action`、`reducer`、 `store`**

  通过 `dispatch` 将 `action` 通过`reducer`处理后传到 `store`。

  - `Action` 本质上是普通对象，`action` 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作。**把数据从应用传到 `store` 的有效载荷。它是 `store` 数据的唯一来源。**

  - `Reducer` 本质上是纯函数，**只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。**
 
  - `Store` 存储维护数据信息


### 常用API及内部实现

- `createStore(rootReducer,initialState,middlewares)` 方法

   创建存储 `currentReducer`、`currentState`、`currentListeners`，返回`store对象`

- `combineReducers`

  合并`reducer`,并返回`combination`函数,根据`reducer key`拆分`state`执行`reducer`,并返回新的`store state`;

  ```javascript
    // 核心实现
    function combineReducers(reducers){
        return function combination(state,action){

          const reducerKeys = Object.keys(reducers);
          const nextState = {};
          let hasChanged = false;

          for (let i = 0; i < reducerKeys.length; i++) {

            const key = reducerKeys[i]; // reducer key

            const reducer = reducers[key]; // reducer 函数
            const reducerState = state[key]; // reducer 对应状态
            const nextReducerState = reducer(previousStateForKey, action); // reducer 新状态

            if (typeof nextReducerState === 'undefined') {
              const errorMessage = getUndefinedStateErrorMessage(key, action)
              throw new Error(errorMessage)
            }

            nextState[key] = nextReducerState; // 构建新的 store 存储对象
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey
          }

          return hasChanged ? nextState : state; 
        }
    }
    
  ```

- `compose(...funcs)`

  **从右到左**构成单参数函数,右边的执行结果是左边的参数。

  ```javascript
    // 核心实现
    function compose(...funcs) {
      return funcs.reduce((a, b) => (...args) => a(b(...args)))
    }
  ```

- `applyMiddleware(...middlewares)`

  二次封装处理 `dispatch `

  ```javascript
  // 核心实现
  function applyMiddleware(...middlewares){
    return (createStore)=>(...args)=>{
      const store = createStore(...args);
      const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
      }

      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      dispatch = compose(...chain)(store.dispatch)

      return {
      ...store,
      dispatch
      }
    }
  }

  ```


- `bindActionCreators(actionCreators, dispatch)`

    **使用方式**
    
  ```javascript
    // actionCreators
    const actionCreators={
        addTodo(){
            return {
              type: 'ADD_TODO',
              text
            };
        },
        removeTodo(id) {
          return {
            type: 'REMOVE_TODO',
            id
          };
        }
      }

    // 注入dispatch
    const boundActionCreators = bindActionCreators(actionCreators, dispatch);
    
  ```

    **核心实现**

    
  ```javascript
    function bindActionCreator(actionCreator, dispatch) {
      return function() {
        return dispatch(actionCreator.apply(this, arguments))
      }
    }
  ```
