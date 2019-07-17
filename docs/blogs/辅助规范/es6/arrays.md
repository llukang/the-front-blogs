## 数组

- [4.1](#arrays--literals) 优先使用字面量来定义数组. eslint: [`no-array-constructor`](http://eslint.org/docs/rules/no-array-constructor.html)

  ```javascript
  // bad
  const items = new Array();

  // good
  const items = [];
  ```

- [4.2](#arrays--push) 向数组添加元素时使用 `Arrary push` 替代直接赋值

  ```javascript
  const someStack = [];

  // bad
  someStack[someStack.length] = 'abracadabra';

  // good
  someStack.push('abracadabra');
  ```

- [4.3](#es6-array-spreads) 使用拓展运算符 ... 复制数组.

  ```javascript
  // bad
  const len = items.length;
  const itemsCopy = [];
  let i;

  for (i = 0; i < len; i += 1) {
    itemsCopy[i] = items[i];
  }

  // good
  const itemsCopy = [...items];
  ```

- [4.4](#arrays--from) 使用 [Array.from](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 把一个类数组对象转换成数组.

  ```javascript
  const foo = document.querySelectorAll('.foo');
  const nodes = Array.from(foo);
  ```

- [4.5](#arrays--callback-return) 在array回调方法的中使用`return`声明，如果函数的主体只是返回单行的表达式，则可以省略`return`. eslint: [`array-callback-return`](http://eslint.org/docs/rules/array-callback-return)

  ```javascript
  // good
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });

  // good
  [1, 2, 3].map(x => x + 1);

  // bad
  const flat = {};
  [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
    const flatten = memo.concat(item);
    flat[index] = flatten;
  });

  // good
  const flat = {};
  [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
    const flatten = memo.concat(item);
    flat[index] = flatten;
    return flatten;
  });

  // bad
  inbox.filter((msg) => {
    const { subject, author } = msg;
    if (subject === 'Mockingbird') {
      return author === 'Harper Lee';
    } else {
      return false;
    }
  });

  // good
  inbox.filter((msg) => {
    const { subject, author } = msg;
    if (subject === 'Mockingbird') {
      return author === 'Harper Lee';
    }

    return false;
  });
  ```

- [4.6](#arrays--bracket-newline) 如果数组拥有多行，请在数组的前置以及后置方括号处断行

```javascript
// bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];

// good
const arr = [[0, 1], [2, 3], [4, 5]];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [
  1,
  2,
];
```

- [4.7](#arrays--from) 使用`includes`替代`indexOf`判断是否包含某一项元素.

  ```javascript
  // bad
  const scores = [1,2,3,4,5];
  scores.indexOf(1) > -1

  // good
  const scores = [1,2,3,4,5];
  scores.includes(1)
  ```

- [4.8](#arrays--callback-naming) array 回调方法中，优先使用数组名称的单数形式命名，如果回调函数体简短，则可以使用单数名词的首字母命名

  ```javascript
  const scores = [1, 2, 3, 4, 5]

  const newScores = socres.map(x => x*10);
  const newScores = score.map((score) => {
    score += 10;
    x...
  })
  ```

- [4.9](#arrays--foreach) 遍历数组时，如果不需要返回新的数组，请使用`forEach`而不是`map`

  ```javascript
  // bad
  const scores = [1, 2, 3, 4, 5]
  score.map((score) => {
    score += 10;
    x...
  })

  // good
  const scores = [1, 2, 3, 4, 5]
  score.forEach((score) => {
    score += 10;
    x...
  })
  ```
