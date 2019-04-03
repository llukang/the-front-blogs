## 分号

- [21.1](#semicolons--required) 请使用分号 eslint: [`semi`](http://eslint.org/docs/rules/semi.html)

  ```javascript
  // bad
  (function () {
    const name = 'Skywalker'
    return name
  })()

  // good
  (function () {
    const name = 'Skywalker';
    return name;
  }());

  // good, but legacy (guards against the function becoming an argument when two files with IIFEs are concatenated)
  ;((() => {
    const name = 'Skywalker';
    return name;
  })());
  ```

  [Read more](https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function/7365214#7365214).