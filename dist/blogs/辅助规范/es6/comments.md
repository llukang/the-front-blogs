## Comments

- [18.1](#comments--multiline) 使用`/** ... */`作为多行注释.

  ```javascript
  // bad
  // make() returns a new element
  // based on the passed in tag name
  //
  // @param {String} tag
  // @return {Element} element
  function make(tag) {

    // ...

    return element;
  }

  // good
  /**
    * make() returns a new element
    * based on the passed-in tag name
    */
  function make(tag) {

    // ...

    return element;
  }
  ```

- [18.2](#comments--singleline) 使用`//`作为单行注释。在注释对象上面另起一行使用单行注释.

  ```javascript
  // bad
  const active = true;  // is current tab

  // good
  // is current tab
  const active = true;

  // bad
  function getType() {
    console.log('fetching type...');
    // set the default type to 'no type'
    const type = this.type || 'no type';

    return type;
  }

  // good
  function getType() {
    console.log('fetching type...');

    // set the default type to 'no type'
    const type = this.type || 'no type';

    return type;
  }

  // also good
  function getType() {
    // set the default type to 'no type'
    const type = this.type || 'no type';

    return type;
  }
  ```

- [18.3](#comments--spaces) 所有注释以空格开头，以方便阅读. eslint: [`spaced-comment`](http://eslint.org/docs/rules/spaced-comment)

  ```javascript
  // bad
  //is current tab
  const active = true;

  // good
  // is current tab
  const active = true;

  // bad
  /**
    *make() returns a new element
    *based on the passed-in tag name
    */
  function make(tag) {

    // ...

    return element;
  }

  // good
  /**
    * make() returns a new element
    * based on the passed-in tag name
    */
  function make(tag) {

    // ...

    return element;
  }
  ```

- [18.4](#comments--actionitems) 给注释增加 FIXME 或 TODO 的前缀可以帮助其他开发者快速了解这是一个需要复查的问题，或是给需要实现的功能提供一个解决方式。这将有别于常见的注释，因为它们是可操作的。使用FIXME -- need to figure this out 或者 TODO -- need to implement.

- [18.5](#comments--fixme) 使用 `// FIXME:` 标志可能产生的问题.

  ```javascript
  class Calculator extends Abacus {
    constructor() {
      super();

      // FIXME: shouldn’t use a global here
      total = 0;
    }
  }
  ```

- [18.6](#comments--todo) 使用 `// TODO:` 标注问题需要的解决方式.

  ```javascript
  class Calculator extends Abacus {
    constructor() {
      super();

      // TODO: total should be configurable by an options param
      this.total = 0;
    }
  }
  ```
