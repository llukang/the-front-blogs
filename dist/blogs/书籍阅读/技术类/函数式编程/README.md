### 函数式编程

#### 函数的合成和柯里化

1. 合成
```
const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
}

```
2. 柯里化，把一个多参数的函数，转化为单参数函数。

```
// 柯里化之前
function add(x, y) {
  return x + y;
}

add(1, 2) // 3

// 柯里化之后
function addX(y) {
  return function (x) {
    return x + y;
  };
}

addX(2)(1) // 3

```


#### 函子
  它首先是一种范畴，也就是说，是一个容器，包含了值和变形关系。比较特殊的是，它的变形关系可以依次作用于每一个值，将当前容器变形成另一个容器。

  1. 函子的实现

  ```
  class Functor {
    constructor(val) { 
      this.val = val; 
    }

    // 函数式编程一般约定，函子有一个of方法，用来生成新的容器。
    of(){
      return new Functor(val));
    }

    // 一般约定，函子的标志就是容器具有map方法。该方法将容器里面的每一个值，映射到另一个容器。
    map(f) {
      return new Functor(f(this.val));
    }
  }

  Functor.of(2).map(function (two) {
    return two + 2;
  });

  ```
  > Functor是一个函子，它的map方法接受函数f作为参数，然后返回一个新的函子，里面包含的值是被f处理过的（f(this.val)

  3. Maybe 函子
     Maybe的map方法里面设置了空值检查。

  ```
    class Maybe extends Functor {
      map(f) {
        return this.val ? Maybe.of(f(this.val)) : Maybe.of(null);
      }
    }
    // 调用
    Maybe.of(null).map(function (s) {
      return s.toUpperCase();
    });
  ```
  > 对参数进行处理 proptype

  4. Either 函子
    Either 函子内部有两个值：左值（Left）和右值（Right）。右值是正常情况下使用的值，左值是右值不存在时使用的默认值。

  ```
    class Either extends Functor {
      constructor(left, right) {
        this.left = left;
        this.right = right;
      }

      map(f) {
        return this.right ? 
          Either.of(this.left, f(this.right)) :
          Either.of(f(this.left), this.right);
      }
    }

    Either.of = function (left, right) {
      return new Either(left, right);
    };
    // 调用
    var addOne = function (x) {
      return x + 1;
    };

    Either.of(5, 6).map(addOne);
    // Either(5, 7);

    Either.of(1, null).map(addOne);
    // Either(2, null);

  ```

>Either 函子的常见用途是提供默认值。另一个用途是代替try...catch，使用左值表示错误,表单校验fn(err,val)。

  5. ap 函子
  函子里面包含的值是函数。

  ```
  class Ap extends Functor {
    ap(F) {
      return Ap.of(this.val(F.val));
    }
  }

  // 调用
  function add(x) {
    return function (y) {
      return x + y;
    };
  }

  Ap.of(add(2)).ap(Maybe.of(3)).ap(Maybe.of(2));
  // Ap(7)
  ```
  >函数add是柯里化以后的形式，一共需要两个参数。通过 ap 函子，我们就可以实现从两个容器之中取值。
  
  6. Monad 函子
     Monad 函子主要用于处理多层嵌套的函子,IO 操作。Monad 函子的作用是，总是返回一个单层的函子。

  ```
    class Monad extends Functor {
      join() {
        return this.val;
      }
      flatMap(f) {
        return this.map(f).join();
      }
    }
  ```