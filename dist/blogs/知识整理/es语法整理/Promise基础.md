## ES6 阅读笔记--Promise 对象

阅读[《阮一峰-ECMAScript 6 入门》](http://es6.ruanyifeng.com/)笔记与个人总结。

#### 基本介绍

@(ES6 笔记)

Promise 是异步编程的一种解决方案。所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

#### 三种状态：Pending,Resolved,Rejected

1. **对象的状态不受外界影响**。Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

2. **一旦状态改变，就不会再变**，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

3. Promise 也有一些缺点。首先，无法取消 Promise，**一旦新建它就会立即执行，无法中途取消**。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

#### 基本用法

ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例。

```javascript
  var promise = new Promise(function(resolve, reject) {
    // ... some code

    if (/* 异步操作成功 */){
      resolve(value);
    } else {
      reject(error);
    }
  });
  //创建Promise实例后
  promise.then(function(value) {
    // success
  }, function(error) {
    // failure
  });
```

> **流程**：首先创造一个 promise 实例，而构造函数 Promise 需要要接受一个函数作为参数，该函数可以得到`resolve`和`reject`两个函数作为参数。在回调函数内，我们可以这两个参数处理异步操作，并将异步操作的结果，传到实例对象 promise 的`then`方法中，then 方法也接受两个函数，分别在`resolve`和`reject`调用时调用。

**关于 Promise 新建后立即执行**

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('Resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// Resolved
```

> **注意**：Promise 新建后立即执行，所以首先输出的是“Promise”。然后，**then 方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行**，所以“Resolved”最后输出。

#### Promise 嵌套

如果调用`resolve`函数和`reject`函数时带有参数，那么它们的参数会被传递给回调函数。`reject`函数的参数通常是`Error`对象的实例。`resolve`函数的参数除了正常的值以外，还可能是另一个`Promise`实例，表示异步操作的结果有可能是一个值，也有可能是另一个异步操作，

```JavaScript
  var p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000)
  })

  var p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
  })

  p2
    .then(result => console.log(result))
    .catch(error => console.log(error))
  // Error: fail
```

上面代码中，`p1`和`p2`都是 Promise 的实例，但是`p2`的`resolve`方法将`p1`作为参数，即一个异步操作的结果是返回另一个异步操作。

> **流程**：Promise 创建之后立即执行，并将状态保存到实例中，在`p2`中将等待`p1`的异步结果才会执行`then`方法。虽然`p2`中是使用`resolve`方法接受`p1`的结果，但是在`then`方法中仍然受`p1`影响。多个`Promise`对象嵌套使用时，只要有一个**reject**结果，则最终的结果为**reject**。

> **注意**：这时`p1`的状态就会传递给`p2`，也就是说，`p1`的状态决定了`p2`的状态。如果`p1`的状态是`Pending`，那么`p2`的回调函数就会等待`p1`的状态改变；如果`p1`的状态已经是`Resolved`或者`Rejected`，那么`p2`的回调函数将会立刻执行。

#### Promise.prototype.then()

`then`方法定义在`Promise`原型对象上，为`Promise`实例添加状态改变时的回调函数，第一个参数是 Resolved 状态的回调函数，第二个参数（可选）是 Rejected 状态的回调函数

```javascript
getJSON('/posts.json')
  .then(function(json) {
    return json.post;
  })
  .then(function(post) {
    // ...
  });
```

> **注意**：使用`then`方法进行链式调用时，必须要有`return`值，当返回值是值时,并将其注入到下一个`then`方法的回调中，`resolve`和`reject`返回分别注入到下一个 then 方法中的`resolve`和`reject`中。中间件的实现原理。当返回值为`promise`对象是则根据`promise`对象的状态注入到下一个`then`方法中。

#### Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

```javascript
getJSON('/posts.json')
  .then(function(posts) {
    // ...
  })
  .catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
  });
```

> **注意**：Promise 在 resolve 语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。如果`then`方法指定了`reject`处理函数，则不会触发`catch`方法。

> 一般来说，不要在`then`方法里面定义`Reject`状态的回调函数（即`then`的第二个参数），总是使用 catch 方法。

> `catch`方法返回的还是一个`Promise`对象

#### Promise.all()

Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
// 生成一个Promise对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function(id) {
  return getJSON('/post/' + id + '.json');
});

Promise.all(promises)
  .then(function(posts) {
    // ...
  })
  .catch(function(reason) {
    // ...
  });
```

> **解释**：promises 是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成 fulfilled，或者其中有一个变为 rejected，才会调用 Promise.all 方法后面的回调函数。

#### Promise.race()

`Promise.race`方法同样是将多个 Promise 实例，只要其中有一个实例率先改变状态，`Promise`的状态就跟着改变。那个率先改变的 `Promise` 实例的返回值，就传递给`Promise`的回调函数。

**超时校验**

```javascript
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000);
  })
]);
p.then(response => console.log(response));
p.catch(error => console.log(error));
```

> **解释**：如果指定时间内没有获得结果，就将`Promise`的状态变为`reject`，否则变为`resolve`。

#### Promise.resolve()

将现有对象转为 Promise 对象

- **参数是一个 Promise 实例**

```javascript
var jsPromise = Promise.resolve($.ajax('/whatever.json'));
```

> 如果参数是 Promise 实例，那么 Promise.resolve 将不做任何修改、原封不动地返回这个实例。

- **参数是一个`thenable`对象**

`thenable`对象指的是具有`then`方法的对象

```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value); // 42
});
```

> `thenable`对象的`then`方法执行后，对象 p1 的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 42。

- **参数不是具有 then 方法的对象，或根本就不是对象**

如果参数是一个原始值，或者是一个不具有 then 方法的对象，则 Promise.resolve 方法返回一个新的 Promise 对象，状态为 Resolved。

```javascript
var p = Promise.resolve('Hello'); //中间件值传递的实现方式

p.then(function(s) {
  console.log(s);
});
// Hello
```

> **解释**:上面代码生成一个新的`Promise`对象的实例 p。由于字符串 Hello 不属于异步操作（判断方法是字符串对象不具有`then`方法），返回`Promise`实例的状态从一生成就是`Resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。

- **不带有任何参数**

`Promise.resolve`方法允许调用时不带参数，直接返回一个`Resolved`状态的`Promise`对象。

```javascript
setTimeout(function() {
  console.log('three');
}, 0);

Promise.resolve().then(function() {
  console.log('two');
});

console.log('one');

// one
// two
// three
```

> **注意**：立即 resolve 的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

> **解释**：`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log(’one‘)`则是立即执行，因此最先输出。

> **事件循环**：个人理解为，当你循环调用一个函数时，`setTimeout`是在下一次循环前调用，当前循环最最后调用，`Promise.resolve()`是当前作用域最后调用，和函数的**栈**相关

#### Promise.reject()

`Promise.reject(reason)`方法也会返回一个新的 `Promise` 实例，该实例的状态为`rejected`。

```javascript
//个人感觉用处不大
var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve, reject) => reject('出错了'));

p.then(null, function(s) {
  console.log(s);
});
// 出错了
```

> **注意**:`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

#### done()

`Promise`对象的回调链，不管以`then`方法或`catch`方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为 Promise 内部的错误不会冒泡到全局）。因此，我们可以提供一个`done`方法，**总是处于回调链的尾端**，保证抛出任何可能出现的错误。

```javaScript
  asyncFunc()
    .then(f1)
    .catch(r1)
    .then(f2)
    .done();
  //实现代码
  Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
      .catch(function (reason) {
        // 抛出一个全局错误
        setTimeout(() => { throw reason }, 0);
      });
  };
```

#### finally()

`finally`方法用于指定不管`Promise`对象最后状态如何，都会执行的操作。它与`done`方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

```javascript
//服务器使用Promise处理请求，然后使用finally方法关掉服务器
server
  .listen(0)
  .then(function() {
    // run test
  })
  .finally(server.stop);
//实现代码
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};
```

#### 实例

**异步加载图片**

```javascript
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
```

**Generator 函数与 Promise 的结合**

```javascript
function getFoo() {
  return new Promise(function(resolve, reject) {
    resolve('foo');
  });
}

var g = function*() {
  try {
    var foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

//控制异步流程
function run(generator) {
  var it = generator();

  function go(result) {
    if (result.done) {
      return result.value;
    } else {
      return result.value.then(
        function(value) {
          return go(it.next(value));
        },
        function(error) {
          return go(it.throw(error));
        }
      );
    }
  }
  go(it.next());
}
run(g);
```

**Ajax 封装**

```javascript
var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject) {
    var client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
  });

  return promise;
};

getJSON('/posts.json').then(
  function(json) {
    console.log('Contents: ' + json);
  },
  function(error) {
    console.error('出错了', error);
  }
);
```

### 反馈与建议

- 开源中国：http://git.oschina.net/liulukang
- 邮箱：<275432465@qq.com>

## 感谢阅读这份帮助文档
