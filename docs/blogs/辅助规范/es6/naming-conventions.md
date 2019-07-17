## 命名规则

- [23.1](#naming--descriptive) 避免单字母命名, 命名应具备描述性(array回调函数除外). eslint: [`id-length`](http://eslint.org/docs/rules/id-length)

  ```javascript
  // bad
  function q() {
    // ...
  }

  // good
  function query() {
    // ...
  }
  ```

- [23.2](#naming--camelCase) 使用驼峰式命名对象、函数和实例. eslint: [`camelcase`](http://eslint.org/docs/rules/camelcase.html) jscs: [`requireCamelCaseOrUpperCaseIdentifiers`](http://jscs.info/rule/requireCamelCaseOrUpperCaseIdentifiers)

  ```javascript
  // bad
  const OBJEcttsssss = {};
  const this_is_my_object = {};
  function c() {}

  // good
  const thisIsMyObject = {};
  function thisIsMyFunction() {}
  ```

- [23.3](#naming--PascalCase) 使用帕斯卡式命名构造函数或类. eslint: [`new-cap`](http://eslint.org/docs/rules/new-cap.html) jscs: [`requireCapitalizedConstructors`](http://jscs.info/rule/requireCapitalizedConstructors)

  ```javascript
  // bad
  function user(options) {
    this.name = options.name;
  }

  const bad = new user({
    name: 'nope',
  });

  // good
  class User {
    constructor(options) {
      this.name = options.name;
    }
  }

  const good = new User({
    name: 'yup',
  });
  ```

- [23.4](#naming--leading-underscore) Do not use trailing or leading underscores. eslint: [`no-underscore-dangle`](http://eslint.org/docs/rules/no-underscore-dangle.html) jscs: [`disallowDanglingUnderscores`](http://jscs.info/rule/disallowDanglingUnderscores)

  > Why? JavaScript does not have the concept of privacy in terms of properties or methods. Although a leading underscore is a common convention to mean “private”, in fact, these properties are fully public, and as such, are part of your public API contract. This convention might lead developers to wrongly think that a change won’t count as breaking, or that tests aren’t needed. tl;dr: if you want something to be “private”, it must not be observably present.

  ```javascript
  // bad
  this.__firstName__ = 'Panda';
  this.firstName_ = 'Panda';
  this._firstName = 'Panda';

  // good
  this.firstName = 'Panda';
  ```

- [23.5](#naming--self-this) 不保存`this`的引用。使用箭头函数或[Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind). jscs: [`disallowNodeTypes`](http://jscs.info/rule/disallowNodeTypes)

  ```javascript
  // bad
  function foo() {
    const self = this;
    return function () {
      console.log(self);
    };
  }

  // bad
  function foo() {
    const that = this;
    return function () {
      console.log(that);
    };
  }

  // good
  function foo() {
    return () => {
      console.log(this);
    };
  }
  ```

- [23.6](#naming--filename-matches-export) 如果你的文件只输出一个类，那你的文件名必须和类名完全保持一致.

  ```javascript
  // file 1 contents
  class CheckBox {
    // ...
  }
  export default CheckBox;

  // file 2 contents
  export default function fortyTwo() { return 42; }

  // file 3 contents
  export default function insideDirectory() {}

  // in some other file
  // bad
  import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
  import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
  import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export

  // bad
  import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
  import forty_two from './forty_two'; // snake_case import/filename, camelCase export
  import inside_directory from './inside_directory'; // snake_case import, camelCase export
  import index from './inside_directory/index'; // requiring the index file explicitly
  import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

  // good
  import CheckBox from './CheckBox'; // PascalCase export/import/filename
  import fortyTwo from './fortyTwo'; // camelCase export/import/filename
  import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
  // ^ supports both insideDirectory.js and insideDirectory/index.js
  ```

- [23.7](#naming--camelCase-default-export) 当你导出默认的函数且使用驼峰式命名。你的文件名必须和函数名完全保持一致.

  ```javascript
  function makeStyleGuide() {
    // ...
  }

  export default makeStyleGuide;
  ```

- [23.8](#naming--PascalCase-singleton) 当你导出构造函数、类、单例、函数库、空对象时使用帕斯卡式命名.

  ```javascript
  const AirbnbStyleGuide = {
    es6: {
    },
  };

  export default AirbnbStyleGuide;
  ```

- [23.9](#naming--Acronyms-and-Initialisms) 首字母缩略词需要全部大写或者全部小写.

  > Why? 更容易阅读理解.

  ```javascript
  // bad
  import SmsContainer from './containers/SmsContainer';

  // bad
  const HttpRequests = [
    // ...
  ];

  // good
  import SMSContainer from './containers/SMSContainer';

  // good
  const HTTPRequests = [
    // ...
  ];

  // also good
  const httpRequests = [
    // ...
  ];

  // best
  import TextMessageContainer from './containers/TextMessageContainer';

  // best
  const requests = [
    // ...
  ];
  ```
