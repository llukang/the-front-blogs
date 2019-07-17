## Blocks

- [16.1](#blocks--braces) 使用大括号包裹所有的多行代码块.

  ```javascript
  // bad
  if (test)
    return false;

  // good
  if (test) return false;

  // good
  if (test) {
    return false;
  }

  // bad
  function foo() { return false; }

  // good
  function bar() {
    return false;
  }
  ```

- [16.2](#blocks--cuddled-elses) 如果通过 if 和 else 使用多行代码块，把 else 放在 if 代码块关闭括号的同一行. eslint: [`brace-style`](http://eslint.org/docs/rules/brace-style.html) jscs:  [`disallowNewlineBeforeBlockStatements`](http://jscs.info/rule/disallowNewlineBeforeBlockStatements)

  ```javascript
  // bad
  if (test) {
    thing1();
    thing2();
  }
  else {
    thing3();
  }

  // good
  if (test) {
    thing1();
    thing2();
  } else {
    thing3();
  }
  ```

