## 类型

- [1.1](#types--primitives) **基本类型**: 对于基本类型的操作是对值的操作.

  - `string`
  - `number`
  - `boolean`
  - `null`
  - `undefined`

  ```javascript
  const foo = 1;
  let bar = foo;

  bar = 9;

  console.log(foo, bar); // => 1, 9
  ```

- [1.2](#types--complex)  **复杂类型**: 对于复杂类型的操作是对引用的操作.

  - `object`
  - `array`
  - `function`

  ```javascript
  const foo = [1, 2];
  const bar = foo;

  bar[0] = 9;

  console.log(foo[0], bar[0]); // => 9, 9
  ```