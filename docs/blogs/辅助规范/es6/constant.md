## 常量

  - [11.1](#const) 常量统一使用`const`定义

  ```javascript
  // bad
  let PAGE_SIZE = 10;

  // good
  const PAGE_SIZE = 10;

  ```

  - [11.2](#const-naming) 普通常量字符全部大写，且以划线连接

  ```javascript
  // bad
  const pageSize = 10;
  const PAGESIZE = 10;

  // good
  const PAGE_SIZE = 10;

  ```

  - [11.3](#const-enum) 类枚举常量, 枚举名称使用PASCAL命名，首字母大写且使用单数形式，其枚举值字符全部大写且以下划线连接

  ```javascript
  // bad
  const actionType = {
    CREATE: 0,
    SAVE: 1
  };

  // bad
  const ACTION_TYPE = {
    CREATE: 0,
    SAVE: 1
  };

  // bad
  const ActionTypes = {
    CREATE: 0,
    SAVE: 1
  };

  // good
  const ActionType = {
    CREATE: 0,
    SAVE: 1
  }

  // good
  const ServiceState = {
    LOADING_SUCCESS: 0,
    LOADING_FAILURE: 1
  }
  ```

  - [11.4](#const-options) `options`常量, 使用复数形式，字符全部大写且以划线连接

  ```javascript
  // bad
  const BUILD_STATE = [{
    value: 1,
    label: '构建成功'
  }, {
    value: 0,
    label: '构建失败'
  }];

  // good
  const BUILD_STATES = [{
    value: 1,
    label: '构建成功'
  }, {
    value: 0,
    label: '构建失败'
  }]
  ```

  - [11.5](#const-file) 全局或通用常量，统一在`constant`文件中定义，仅模块内部使用的常量在模块中(组件外部)定义即可