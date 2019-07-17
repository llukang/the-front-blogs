### 函数式编程-容器（container）

```
var Container = function(x) {
  this.__value = x;
}

Container.create = function(x) { return new Container(x); };
```