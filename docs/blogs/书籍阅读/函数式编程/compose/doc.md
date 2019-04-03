### 函数的合成compose
  如果一个值要经过多个函数，才能变成另外一个值，就可以把所有中间步骤合并成一个函数，这叫做"函数的合成"（`compose`）

  **子函数合成前提条件**
  1. 只能接受一个参数
  1. 满足结合律规律
  2. 必须是纯函数
  
  ####  `pointfree` 模式指的是，永远不必说出你的数据。
  
  ```
  // 非 pointfree，因为提到了数据：name
  var initials = function (name) {
    return name.split(' ').map(compose(toUpperCase, head)).join('. ');
  };
  
  // pointfree
  var initials = compose(join('. '), map(compose(toUpperCase, head)), split(' '));
  
  initials("hunter stockton thompson");
  // 'H. S. T'
  
  ```