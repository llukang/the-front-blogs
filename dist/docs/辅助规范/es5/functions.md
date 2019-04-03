## 函数

  - 永远不要在一个非函数代码块（if、while 等）中声明一个函数，把那个函数赋给一个变量。浏览器允许你这么做，但它们的解析表现不一致。
  - **注：** ECMA-262 把 `块` 定义为一组语句。函数声明不是语句。[阅读对 ECMA-262 这个问题的说明](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97)。

    ```javascript
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }

    // good
    var test;
    if (currentUser) {
      test = function test() {
        console.log('Yup.');
      };
    }
    ```

  - 永远不要把参数命名为 `arguments`。这将取代函数作用域内的 `arguments` 对象。

    ```javascript
    // bad
    function nope(name, options, arguments) {
      // ...stuff...
    }

    // good
    function yup(name, options, args) {
      // ...stuff...
    }
    ```

  - 不允许在函数内出现重复参数

    ```javascript
    // bad
    function nope(name, name) {
      // ...stuff...
    }

    // good
    function yup(name, options) {
      // ...stuff...
    }
    ```

  - 不允许重新声明函数

    ```javascript
    // bad 
    function foo() {}
    foo = bar;

    foo = bar;
    function foo() {}

    function foo() {
      foo = bar;
    }

    // good
    var foo = function () {}
    foo = bar;

    function foo(foo){
      foo = bar;
    }

    function foo(){
      var foo = bar;
    }
    ```