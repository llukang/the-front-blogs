## 解构

  <a name="destructuring--object"></a><a name="5.1"></a>
  - [5.1](#destructuring--object) 使用解构读取和使用对象中的多个属性. jscs: [`requireObjectDestructuring`](http://jscs.info/rule/requireObjectDestructuring)

    > Why? 解构能减少临时引用属性

    ```javascript
    // bad
    function getFullName(user) {
      const firstName = user.firstName;
      const lastName = user.lastName;

      return `${firstName} ${lastName}`;
    }

    // good
    function getFullName(user) {
      const { firstName, lastName } = user;
      return `${firstName} ${lastName}`;
    }

    // best
    function getFullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    }
    ```

  <a name="avoid-over-destructuring--object"></a><a name="5.2"></a>
  - [5.2](#avoid-over-destructuring--object) 避免过度使用对象解构

  ```javascript
  // bad 仅使用对象中的单个属性，则使用频率较低时，不建议使用对象解构
  const { props: { actions: { add }}} = this;

  // good
  this.props.actions.add()
  ```

  <a name="destructuring--array"></a><a name="5.3"></a>
  - [5.3](#destructuring--array) 对数组使用解构赋值. jscs: [`requireArrayDestructuring`](http://jscs.info/rule/requireArrayDestructuring)

    ```javascript
    const arr = [1, 2, 3, 4];

    // bad
    const first = arr[0];
    const second = arr[1];

    // good
    const [first, second] = arr;
    ```

  <a name="destructuring--object-over-array"></a><a name="5.4"></a>
  - [5.4](#destructuring--object-over-array) 需要返回多个值时，使用对象解构，而不是数组解构. jscs: [`disallowArrayDestructuringReturn`](http://jscs.info/rule/disallowArrayDestructuringReturn)

    > Why? 增加属性或者改变排序不会改变调用时的位置.

    ```javascript
    // bad
    function processInput(input) {
      // then a miracle occurs
      return [left, right, top, bottom];
    }

    // the caller needs to think about the order of return data
    const [left, __, top] = processInput(input);

    // good
    function processInput(input) {
      // then a miracle occurs
      return { left, right, top, bottom };
    }

    // the caller selects only the data they need
    const { left, top } = processInput(input);
    ```
