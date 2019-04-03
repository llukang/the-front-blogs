## Redux-Saga 总结

### `Redux-Saga` 要素 `helper`、`effects`

### 1. helper 辅助函数
 1. `takeEvery` 允许多个 `fetchData` 实例同时启动。在某个特定时刻，尽管之前还有一个或多个 `fetchData` 尚未结束，我们还是可以启动一个新的 `fetchData` 任务，

 2. `takeLatest`  只允许一个 `fetchData` 任务在执行。并且这个任务是最后被启动的那个。 如果已经有一个任务在执行的时候启动另一个 `fetchData` ，那之前的这个任务会被自动取消。
 
 3. **action 和 action创建函数** 概念混淆

 ### 2. 声明式 Effects
 1. `call` 允许多个 `fetchData` 实例同时启动。在某个特定时刻，尽管之前还有一个或多个 `fetchData` 尚未结束，我们还是可以启动一个新的 `fetchData` 任务，
 
