## 字符串

- [6.1](#strings--quotes) 字符串使用单引号 ''. eslint: [`quotes`](http://eslint.org/docs/rules/quotes.html) jscs: [`validateQuoteMarks`](http://jscs.info/rule/validateQuoteMarks)

  ```javascript
  // bad
  const name = "Capt. Janeway";

  // bad - template literals should contain interpolation or newlines
  const name = `Capt. Janeway`;

  // good
  const name = 'Capt. Janeway';
  ```

- [6.2](#es6-template-literals) 通过程序来生成字符串时，使用模板字符串代替字符串连接. eslint: [`prefer-template`](http://eslint.org/docs/rules/prefer-template.html) [`template-curly-spacing`](http://eslint.org/docs/rules/template-curly-spacing) jscs: [`requireTemplateStrings`](http://jscs.info/rule/requireTemplateStrings)

  > Why? 模板字符串更为简洁，更具可读性

  ```javascript
  // bad
  function sayHi(name) {
    return 'How are you, ' + name + '?';
  }

  // bad
  function sayHi(name) {
    return ['How are you, ', name, '?'].join();
  }

  // bad
  function sayHi(name) {
    return `How are you, ${ name }?`;
  }

  // good
  function sayHi(name) {
    return `How are you, ${name}?`;
  }
  ```

- [6.3](#strings--eval) 不要对`string`使用`eval()`, `eval`接口会引入很多问题 . eslint: [`no-eval`](http://eslint.org/docs/rules/no-eval)

- [6.4](#strings--escaping) 没必要使用转义字符. eslint: [`no-useless-escape`](http://eslint.org/docs/rules/no-useless-escape)

  ```javascript
  // bad
  const foo = '\'this\' \i\s \"quoted\"';

  // good
  const foo = '\'this\' is "quoted"';
  const foo = `my name is '${name}'`;
  ```


- [6.5](#strings--includes) 使用`includes`代替`indexOf`来判断是否包含制定的子串. 

  ```javascript
  // bad
  const bookName = "javascript good part";
  bookName.indexOf("javascript") > -1

  // good
  const bookName = "javascript good part";
  bookName.includes("javascript")
  ```
