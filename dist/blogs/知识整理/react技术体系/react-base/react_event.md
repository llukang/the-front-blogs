## react 合成事件系统

#### 概论

  `React`自己实现了一套高效的事件注册，存储，分发和重用逻辑，在DOM事件体系基础上做了很大改进，减少了内存消耗，简化了事件逻辑，并最大化的解决了IE等浏览器的不兼容问题。
  
#### 通用属性 
- `bubbles (boolean)` 表示事件是否冒泡
- `cancelable(boolean)` 表示事件是否可以取消
- `currentTarget(DOMEventTarget)` 与Target类似，由于事件可以冒泡，所以两者表示的内容是不同的
- `defaultPrevented(boolean)` 表示事件是否禁止了默认行为
- `eventPhase(number)` 表示事件所处的阶段
- `isTrusted(boolean)` 表示事件是否可信。所谓的可信事件表示的是用户操作的事件，不可信事件就是通过JS代码来触发的事件。
- `nativeEvent(DOMEvent)` `dom`事件系统中的`event`对象
- `preventDefault() (void)` 对应的`defaultPrevented`，表示的是禁止默认行为
- `stopPropagaTion() (void)` 对应的是bubbles，表示的是sh
- `target(DOMEventTarget)`
- `timeStamp(number)` 时间戳，也就是事件触发的事件
- `type(string)` 事件的类型


### react 事件系统 & dom 事件系统

  1. `React`组件上声明的事件最终绑定到了`document`这个DOM节点上，而不是`React`组件对应的DOM节点。故只有`document`这个节点上面才绑定了DOM原生事件，其他节点没有绑定事件。这样简化了DOM原生事件，减少了内存开销。

  2. `React`以队列的方式，从触发事件的组件向父组件回溯，调用它们在JSX中声明的`callback`。也就是`React`自身实现了一套事件冒泡机制。我们没办法用`event.stopPropagation()`来停止事件传播，应该使用`event.preventDefault()`。

  3. `React`有一套自己的合成事件`SyntheticEvent`，不同类型的事件会构造不同的`SyntheticEvent`

  4. `React`使用对象池来管理合成事件对象的创建和销毁，这样减少了垃圾的生成和新对象内存的分配，大大提高了性能

  5. 需要底层的浏览器事件对象，只要使用`nativeEvent`属性就可以获取到它了

### 常见问题

  1. 阻止`React`事件冒泡的行为只能用于`React`合成事件中，没法阻止原生事件的冒泡

  2. 取消原生事件的冒泡会同时取消`React` Event。并且原生事件的冒泡在react event的触发和冒泡之前

  3. `React`的合成时间是在原生事件冒泡到最顶层组件结束后才创建和冒泡的，因为在是实现的时候`React`只是将一个Event listener 挂在了最顶层的组件上，其内部一套自己的机制进行事件的管理


  1. 虚拟事件对象已经被合并。这意味着虚拟事件对象将被重新使用，而该事件回调被调用之后所有的属性将无效，所以 **不能以异步的方式访问事件**

  ```javascript
      function onClick(event) {
        console.log(event); // => nullified object.
        console.log(event.type);  // => "click"
        var eventType = event.type; // => "click"

        setTimeout(function() {
          console.log(event.type); // => null
          console.log(eventType); // => "click"
        }, 0);

        this.setState({clickEvent: event}); // Won't work. this.state.clickEvent will only contain null values.
        this.setState({eventType: event.type}); // You can still export event properties.
      }
  ```

  > 如果您想以一个异步的方式来访问事件属性，您应该对事件调用`event.persist()`。这将从事件池中取出合成的事件，并允许该事件的引用，使用户的代码被保留。

  
#### 参考文档
  - [gitbook](https://chenyitian.gitbooks.io/react-docs/content/docs/ref-05-events.html)
  - [react事件属性](https://www.cnblogs.com/mabylove/p/6873506.html) 