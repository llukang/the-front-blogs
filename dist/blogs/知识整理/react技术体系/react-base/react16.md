## react16 与 react15 比较

#### react16 体积更小

 react16 压缩后 `react` 只有 17.1KB， `reactDom` 122KB
 react15 压缩后 `react` 只有 6.71KB， `reactDom` 99.7KB

 #### 重写核心算法 

 React核心代码重构为`React Fiber`，支持异步渲染，例如拖动、onChange等在不考虑防抖情况，频繁setState的场景，相对于之前版本，有一定性能的提升。

#### 新特性

- render支持 `Array` 和 `String` 渲染

- `Portals` 支持DOM节点渲染在父组件之外

```javascript
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      domNode,
    );
  }
```

- 错误处理 `componentDidCatch`

- 更好的服务端渲染

- 支持自定义DOM属性

```html
  // 你的代码:
  <div mycustomattribute="something" />
  // React15 输出:
  <div />
  // React 16 输出:
  <div mycustomattribute="something" />
```

#### 生命周期

- 已废弃生命周期
  - componentWillMount
  - componentWillReceiveProps
  - componentWillUpdate

- 新增生命周期
  - static getDerivedStateFromProps
  - getSnapshotBeforeUpdate