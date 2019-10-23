## React_Redux 总结

### `React_Redux` 要素 `<Provider store>`、`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`

###  `<Provider store children>` 组件

 1. `<Provider />`是高阶组件,内部通过 `createProvider`方法创建
 2. 实现方式:`createProvider`方法将`redux store`数据通过`react context`方式暴露给子组件

  ```javascript
      class Provider extends Component {
        getChildContext() {
          return { [storeKey]: this[storeKey], [subscriptionKey]: null }
        }
        constructor(props, context) {
          super(props, context)
          this[storeKey] = props.store;
        }
        render() {
          return Children.only(this.props.children)
        }
      }
      
      Provider.propTypes = {
          store: storeShape.isRequired,
          children: PropTypes.element.isRequired,
      }

      Provider.childContextTypes = {
          [storeKey]: storeShape.isRequired,
          [subscriptionKey]: subscriptionShape,
      }

  ```

 ###  `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])` 方法

 1. `connect`API内部通过 `createConnect`方法创建 ,通过`context`获取`Provider`中的`store`，
 2. `connect`模块的返回值`wrapWithConnect`,`wrapWithConnect`返回 `Connect`组件, 并将`mapStateToProps`,`mapDispatchToProps`与组件上原有的`props`合并注入
 3. `mapStateToProps(state,props)`方法 将 `redux` 内部`store`方法暴露出来
 4. `mapDispatchToProps(dispatch, props)`方法 将 `redux` 内部`dispatch`方法暴露出来
 5. `mergeProps(stateProps, mergePropsProps,parentProps)`方法,定义了mapState,mapDispatch及this.props的合并规则
 


 ### React如何响应store变化

 1. `react-redux`才是真正触发`React`重新渲染的模块
 2. 监听`store tree`变化，使其包装的原组件可以响应`state`变化
    通过比较当前 `this.state.store` 与 `redux store`进行比较，
    通过`this.setState()`方法正好可以触发`Connect`及其子组件的重新渲染

 
