## 读取器

- [24.1](#accessors--not-required) 属性的存取函数不是必须的.

- [24.2](#accessors--no-getters-setters) 不要使用JavaScript getters/setters，他们会导致不可预期的副作用，则难于测试以及维护，如果你确实需要访问其函数，可以使用`getVal()`以及`setVal('hello')`.

  ```javascript
  // bad
  class Dragon {
    get age() {
      // ...
    }

    set age(value) {
      // ...
    }
  }

  // good
  class Dragon {
    getAge() {
      // ...
    }

    setAge(value) {
      // ...
    }
  }
  ```

- [24.3](#accessors--boolean-prefix) 如果属性或者方法是`bolean`类型，请使用`isVal()` 或 `hasVal()` 等前缀形式.

  ```javascript
  // bad
  if (!dragon.age()) {
    return false;
  }

  // good
  if (!dragon.hasAge()) {
    return false;
  }
  ```

- [24.4](#accessors--consistent) 可以创建`ge()`和`set()`函数，但是要保持一致.

  ```javascript
  class Jedi {
    constructor(options = {}) {
      const lightsaber = options.lightsaber || 'blue';
      this.set('lightsaber', lightsaber);
    }

    set(key, val) {
      this[key] = val;
    }

    get(key) {
      return this[key];
    }
  }
  ```