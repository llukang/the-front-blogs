## 类 & 构造函数

- [9.1](#constructors--use-class) 总是使用`class`, 避免直接操作`prototype`.

  > Why? `class` 语法更简洁并且更容易理解.

  ```javascript
  // bad
  function Queue(contents = []) {
    this.queue = [...contents];
  }
  Queue.prototype.pop = function () {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  };

  // good
  class Queue {
    constructor(contents = []) {
      this.queue = [...contents];
    }
    pop() {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    }
  }
  ```

- [9.2](#constructors--extends) 使用`extends`实现继承.

  > Why? 这是内置的方式来继承函数原型，并且不会影响`instanceof`.

  ```javascript
  // bad
  const inherits = require('inherits');
  function PeekableQueue(contents) {
    Queue.apply(this, contents);
  }
  inherits(PeekableQueue, Queue);
  PeekableQueue.prototype.peek = function () {
    return this.queue[0];
  };

  // good
  class PeekableQueue extends Queue {
    peek() {
      return this.queue[0];
    }
  }
  ```

- [9.3](#constructors--chaining) 方法可以返回`this`以方便链式调用.

  ```javascript
  // bad
  Jedi.prototype.jump = function () {
    this.jumping = true;
    return true;
  };

  Jedi.prototype.setHeight = function (height) {
    this.height = height;
  };

  const luke = new Jedi();
  luke.jump(); // => true
  luke.setHeight(20); // => undefined

  // good
  class Jedi {
    jump() {
      this.jumping = true;
      return this;
    }

    setHeight(height) {
      this.height = height;
      return this;
    }
  }

  const luke = new Jedi();

  luke.jump()
    .setHeight(20);
  ```

- [9.4](#constructors--tostring) 你也可以实现自定义的`toString()`, 只要能正常执行，且没有副作用.

  ```javascript
  class Jedi {
    constructor(options = {}) {
      this.name = options.name || 'no name';
    }

    getName() {
      return this.name;
    }

    toString() {
      return `Jedi - ${this.getName()}`;
    }
  }
  ```

- [9.5](#constructors--no-useless) 如果没有指定构造函数，类会默认拥有一个构造函数，没必要为类创建一个空或者只是调用父构造器的构造函数. eslint: [`no-useless-constructor`](http://eslint.org/docs/rules/no-useless-constructor)

  ```javascript
  // bad
  class Jedi {
    constructor() {}

    getName() {
      return this.name;
    }
  }

  // bad
  class Rey extends Jedi {
    constructor(...args) {
      super(...args);
    }
  }

  // good
  class Rey extends Jedi {
    constructor(...args) {
      super(...args);
      this.name = 'Rey';
    }
  }
  ```

- [9.6](#classes--no-duplicate-members) 避免定义重复的类成员. eslint: [`no-dupe-class-members`](http://eslint.org/docs/rules/no-dupe-class-members)

  > Why? 重复定义的类成员只有最后一个会生效

  ```javascript
  // bad
  class Foo {
    bar() { return 1; }
    bar() { return 2; }
  }

  // good
  class Foo {
    bar() { return 1; }
  }

  // good
  class Foo {
    bar() { return 2; }
  }
  ```
