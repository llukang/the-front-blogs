## 引用

- [2.1](#references--prefer-const) 使用`const`定义所有的变量，避免使用`var`eslint: [`prefer-const`](http://eslint.org/docs/rules/prefer-const.html), [`no-const-assign`](http://eslint.org/docs/rules/no-const-assign.html)

  > Why? 确保你不会修改你的变量，以避免可能产生的bug,并且也更容易理解

  ```javascript
  // bad
  var a = 1;
  var b = 2;

  // good
  const a = 1;
  const b = 2;
  ```

- [2.2](#references--disallow-var) 如果你需要重定义变量，请使用`let`来代理`var` eslint: [`no-var`](http://eslint.org/docs/rules/no-var.html) jscs: [`disallowVar`](http://jscs.info/rule/disallowVar)

  > Why? `let`是块级作用域，而`var`是函数作用域let` is block-scoped rather than function-scoped like `var`.

  ```javascript
  // bad
  var count = 1;
  if (true) {
    count += 1;
  }

  // good, use the let.
  let count = 1;
  if (true) {
    count += 1;
  }
  ```

- [2.3](#references--block-scope) 注意 let 和 const 都是块级作用域。

  ```javascript
  // const 和 let 只存在于它们被定义的区块内。
  {
    let a = 1;
    const b = 1;
  }
  console.log(a); // ReferenceError
  console.log(b); // ReferenceError
  ```
