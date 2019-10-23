# 阮一峰-ES6 入门阅读笔记

## 1、ES6 简介

- **浏览器支持情况** : http://kangax.github.io/compat-table/es6/
- **浏览器支持检查** : http://ruanyf.github.io/es-checker/
- **Babel 转码器** : 待添加

## 2、let 和 const

1. **let 和 const 命令用于变量声明，且只在所在代码块有效**

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  };
}
a[6](); // 6
//重点区分for循环，循环语句是一个父作用域，循环体内部是子作用域。
```

2.  **不存在变量名提升，必须先声明再使用，否则报错**

```javascript
console.log(bar); // 报错ReferenceError
let bar = 2;
//bar未定义
```

3. **暂时性死区** : 只要块级作用域内存在 let 命令，它所声明的变量就不受外部影响

```javascript
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError，此时tem不可读，认为该变量为声明
  let tmp;
}
```

4. **同一作用域不允许重复声明**

```javascript
function () {
  let a = 10;
  var a = 1;
}
```

> **注意：**`const`声明的是常量，一旦声明不能更改，且声明的同时必须初始化。本质指向内存地址，对于符合类型（数组和对象），不能保证对象内部不变。

> **注意：** ES6 声明变量的 6 种方法：var,function,const,let,import,class。

## 3、块级作用域与顶层对象

1. **ES5 只拥有全局作用域和函数作用域**
   例子：if 语句和 for 循环循环变量泄露

```javascript
  function f() {console.log('I am outside!');}
  (function () {
  if (false) {
      // 重复声明一次函数f
      function f() { console.log('I am inside!');}
      f();//I am inside  函数声明提升
  }());
```

> **注意：**理论上 ES6 输出 `I am outside!`,实际浏览器将函数声明当做了 var 处理。考虑到环境的差异，应避免在块级作用域声明函数，确实需要也应写成函数表达式。

2. **ES6 新增块级作用域 `{}`**

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5 外层代码不受内层代码影响
}
```

3. **do 表达式**

```javascript
//块级作用域的实质是一个语句将多个操作封装在一起，没有返回值
//do表达式得到块级作用域的返回值(浏览器暂不支持)
let test = do {
  let t = abc;
  t = t * t + 1;
};
```

4. **顶层对象**

```javascript
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a; // 1
let b = 1;
window.b; // undefined
```

> **注意:**从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性，let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性。

## 4、变量的结构赋值

ES6 允许按照一定的模式（模式匹配），从数组对象中提取值，并对变量进行赋值（解构）。

1. **数组的解构赋值**

```javascript
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo; // 1
bar; // 2
baz; // 3

let [, , third] = ['foo', 'bar', 'baz'];
third; // "baz"

let [x, , y] = [1, 2, 3];
x; // 1
y; // 3

let [head, ...tail] = [1, 2, 3, 4];
head; // 1
tail; // [2, 3, 4]

let [x, y, ...z] = ['a'];
x; // "a"
y; // undefined
z; // []

//解构设置默认值
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

> **注意：**解构不成功，则变量的值为`undefined`。如等号的右边不具有 Iterrator(遍历器)接口或转化为对象不具备 Iterator 接口，将会报错。
> **注意：**解构赋值内部严格相等运算符（===），判断一个位置是否有值。如果成员不严格等于 undefined，默认值是不会生效的（实例`null`），且判断 undefined 在前，赋默认值在后（惰性求值）。

2.  **对象的解构赋值**

```javascript
  //简单实例
  let { bar, foo } = { foo: "aaa", bar: "bbb" };
  foo // "aaa"
  bar // "bbb"
  let { baz } = { foo: "aaa", bar: "bbb" };
  baz // undefined

  //变量名与所取值不一致时
  var { foo: baz } = { foo: 'aaa', bar: 'bbb' }; //foo是匹配模式，baz是变量
  baz // "aaa"

  // 错误的写法
  let x;
  {x} = {x: 1};
  // SyntaxError: syntax error
  // 正确的写法
  ({x} = {x: 1});

  //获取对象方法
  let { log, sin, cos } = Math;

```

> **注意:** 对象的解构赋值内部实现机制是，先找到同名属性，然后赋值给变量，真正赋值是后者不是前者

> **注意:** 对象的解构是声明赋值是一体的，不能对当前作用域的同名变量进行解构

> **注意:** 大括号`{}`写在行首，JavaScript 将其解释为代码块，解决方案添加圆括号`()`。\*建议只要有可能就不要再模式中使用圆括号。

3. **字符串的解构赋值**

```javascript
//简单实例
const [a, b, c, d, e] = 'hello';
let { length: len } = 'hello';

let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

> **注意：**解构赋值的规则是，等号右边的值不是对象或数组，就先将其转为对象。若无法转化为对象，就会报错（`undefined`,`null`）

4. **数值与布尔值的解构赋值**

```javascript
let { toString: s } = 123;
s === Number.prototype.toString; // true

let { toString: s } = true;
s === Boolean.prototype.toString; // true
```

5. **函数参数的解构赋值**

```javascript
function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}
move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

5.  **解构赋值中圆括号问题**

解构赋值不能使用圆括号的情况:

```javascript
  //变量声明语句中不能使用圆括号
  let {x: (c)} = {};

  //函数参数中，模式不能带有圆括号
  function f([(2)]){return z;}

  //赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中
  ({ p: a }) = { p: 42 };
  [({ p: a }), { x: c }] = [{}, {}];

```

解构赋值能够使用圆括号的情况:

```javascript
//赋值语句的非模式部分，可以使用圆括号。
[b] = [3]; // 正确
({ p: d } = {}); // 正确
[parseInt.prop] = [3]; // 正确
```

## 5、字符串的扩展

1. **字符串索引**

```javascript
  var s = 'Hello world!';

  //是否在字符串头部，第二个参数表示索引开始位置
  s.startsWith('Hello'，6) // true

  //是否在字符串尾部
  s.endsWith('!',1) // true

  //是否找到该字符串
  s.includes('o',1) // true

```

2. **字符串重复**

```javascript
//字符串重复n次，n为自然数，小数将被取整。负数和`Infinity`报错。
s.repeat(3); // Hello world!Hello world!Hello world!
```

> **注意:** 字符串重复的操作为，先进行取整运算，然后重复。即如果参数是 0 到-1 之间的小数，则是 0。

3. **字符串补全**

```javascript
  //padStart和padEnd一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。
  'x'.padStart(5, 'ab') // 'ababx'
  'x'.padStart(4, 'ab') // 'abax'

  'xxx'.padStart(2, 'ab') // 'xxx'
  'xxx'.padEnd(2, 'ab') // 'xxx'

  'abc'.padStart(10, '0123456789')
  // '0123456abc'

  x'.padStart(4) // '   x'
  'x'.padEnd(4) // 'x   '

```

> **注意:** 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。

> **注意:** 如果省略第二个参数，默认使用空格补全长度。

4. **模板字符串**

```javascript
let basket = {
  count: 'abc',
  onSale: true
};

//ES5
$('#result').append(
  'There are <b> ' +
    basket.count +
    '</b>  ' +
    'items in your basket, ' +
    '<em> ' +
    basket.onSale +
    '</em>  are on sale!'
);

//ES6
$('#result').append(`
    There are <b> ${basket.count}</b>  items
    in your basket, <em> ${basket.onSale}</em> 
    are on sale!
  `);

//模板字符串的嵌套
const tmpl = addrs => `
    <table> 
    ${addrs
      .map(
        addr => `
      <tr> <td> ${addr.first}</td> </tr> 
      <tr> <td> ${addr.last}</td> </tr> 
    `
      )
      .join('')}
    </table>
    `;
```

## 反馈与建议

- 开源中国：http://git.oschina.net/liulukang
- 邮箱：<275432465@qq.com>

感谢阅读这份帮助文档。

---
