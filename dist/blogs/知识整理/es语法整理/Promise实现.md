## 实现 Promises/A+ 规范

- Promise 状态
  - pending, fulfilled, rejected
- promise 必须有 then 方法，

  - 接受 onFulfilled 和 onRejected 参数
  - then 方法必须返回 promise。

- resolve 特殊处理
  - 如果 result 是当前 promise 本身
  - 如果 result 是另一个 promise，那么沿用它的 state 和 result 状态。
  - 如果 result 是一个 thenable 对象。先取 then 函数，再 call then 函数，重新进入 resolve

#### ES5 代码实现

```javascript
const State = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
};

// 函数判断
const isFunction = arg => {
  return Object.prototype.toString.call(arg) === '[object Function]';
};

// promise 判断
const isPromise = arg => {
  return arg instanceof Promise;
};

// isThenable 对象
const isThenable = arg => {
  return arg && isFunction(arg.then);
};

// then 回调
const handleCallback = (callback, state, result) => {
  const { onFulfilled, onRejected, resolve, reject } = callback;
  try {
    if (state === State.FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result);
    } else {
      isFunction(onRejected) ? reject(onRejected(result)) : reject(result);
    }
  } catch (error) {
    reject(error);
  }
};

const handleCallbacks = (callbacks, state, result) => {
  while (callbacks.length) {
    handleCallback(callbacks.shift(), state, result);
  }
};

// 状态迁移函数
const transition = (promise, state, result) => {
  if (promise.state !== State.PENDING) {
    return;
  }
  promise.state = state;
  promise.result = result;
  setTimeout(() => {
    handleCallbacks(promise.callbacks, state, result);
  }, 0);
};

// @ts-ignore Promise 构造函数
function Promise(f) {
  this.state = State.PENDING;
  this.result = null;
  this.callbacks = [];
  // 保证 resolve 与 reject 只调用一次
  let ignore = false;

  const resolve = result => {
    ignore = true;
    // result 是 promise 本身
    if (result === this) {
      const reason = new TypeError('can not fufill promise with itself');
      transition(this, State.REJECTED, '');
      return;
    }
    // result 是另一个 promise
    if (isPromise(result)) {
      result.then(resolve, reject);
      return;
    }

    // result 是 thenable 对象
    if (isThenable(result)) {
      new Promise(result.then.bind(result)).then(resolve, reject);
      return;
    }

    transition(this, State.FULFILLED, result);
  };

  const reject = reason => {
    ignore = true;
    transition(this, State.REJECTED, reason);
  };

  try {
    f(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    const callback = { onFulfilled, onRejected, resolve, reject };
    if (this.state === State.PENDING) {
      this.callbacks.push(callback);
    } else {
      setTimeout(() => {
        console.log(this.state, '1');
        handleCallback(callback, this.state, this.result);
      }, 0);
    }
  });
};

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.resolve = result => {
  return new Promise(resolve => {
    resolve(result);
  });
};

Promise.prototype.reject = reason => {
  return new Promise((_, reject) => {
    reject(reason);
  });
};
```

#### ES6 版本

```javascript
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

// 函数判断
const isFunction = arg => {
  return Object.prototype.toString.call(arg) === '[object Function]';
};

// promise 判断
const isPromise = arg => {
  return arg instanceof IPromise;
};

// isThenable 对象
const isThenable = arg => {
  return arg && isFunction(arg.then);
};

class IPromise {
  constructor(fn) {
    this.state = PENDING;
    this.result = null;
    this.callbacks = [];

    this._resolve = this._resolve.bind(this);
    this._reject = this._reject.bind(this);
    this._transition = this._transition.bind(this);
    this.then = this.then.bind(this);

    try {
      fn(this._resolve, this._reject);
    } catch (error) {
      this._reject(error);
    }
  }

  _resolve(result) {
    if (this.state !== PENDING) {
      return;
    }
    if (result === this) {
      const reason = new TypeError('can not fufill promise with itself');
      this.reject(reason);
      return;
    }

    if (isPromise(result)) {
      result.then(this._resolve, this._reject);
      return;
    }

    if (isThenable(result)) {
      new IPromise(result.then.bind(result)).then(this._resolve, this._reject);
      return;
    }

    this._transition(FULFILLED, result);
  }

  _reject(reason) {
    if (this.state !== PENDING) {
      return;
    }
    this._transition(REJECTED, reason);
  }

  _transition(state, result) {
    this.state = state;
    this.result = result;
    this._handleCallbacks(this.callbacks);
  }

  _handleCallbacks(callbacks) {
    while (callbacks.length) {
      this._handleCallback(callbacks.shift());
    }
  }

  _handleCallback(callback) {
    try {
      const { promise, onFulfilled, onRejected, resolve, reject } = callback;
      const { state, result } = promise;
      if (state === FULFILLED) {
        isFunction(onFulfilled)
          ? resolve(onFulfilled(result))
          : resolve(result);
      }
      if (state === REJECTED) {
        isFunction(onRejected) ? resolve(onRejected(result)) : resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new IPromise((resolve, reject) => {
      const callback = {
        onFulfilled,
        onRejected,
        resolve,
        reject,
        promise: this
      };
      if (this.state === PENDING) {
        this.callbacks.push(callback);
      } else {
        this._handleCallback(callback);
      }
    });
  }
}
```

#### TODO

- Promise.prototype.all
