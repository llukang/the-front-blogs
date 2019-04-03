## Basic Rules 基本规范

  - 每个文件只写一个模块.
    - 但是多个[无状态模块](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)可以放在单个文件中. eslint: [`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless).
  - 推荐使用JSX语法.
  - 不要使用 `React.createElement`，除非从一个非JSX的文件中初始化你的app.
  - 使用ES6 class定义React组件时，采用构造函数内绑定this。

## 创建模块
   Class vs React.createClass vs stateless  

  - 如果你的模块有内部状态或者是`refs`, 推荐使用 `class extends React.Component` 而不是 `React.createClass`.
  eslint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md) [`react/prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

    ```jsx
    // bad
    const Listing = React.createClass({
      // ...
      render() {
        return <div>{this.state.hello}</div>;
      }
    });

    // good
    class Listing extends React.Component {
      // ...
      render() {
        return <div>{this.state.hello}</div>;
      }
    }
    ```

    如果你的模块没有状态或是没有引用`refs`， 推荐使用普通函数（非箭头函数）而不是类:

    ```jsx
    // bad
    class Listing extends React.Component {
      render() {
        return <div>{this.props.hello}</div>;
      }
    }

    // bad (relying on function name inference is discouraged)
    const Listing = ({ hello }) => (
      <div>{hello}</div>
    );

    // good
    function Listing({ hello }) {
      return <div>{hello}</div>;
    }
    ```

## 表单控件

  表单控件需要同时满足受控与非受控的原则
  自定义或第三方的表单控件，也可以与`Form`组件一起使用。只要该组件遵循以下的约定：

  - 提供受控属性`value`或其它与`valuePropName`的值同名的属性
  - 提供`onChange`事件或`trigger`的值同名的事件
  - 不能是函数式组件

  参考[React:创建同时受控与非受控的组件](http://blog.csdn.net/fendouzhe123/article/details/52121704)

    ```javascript

    // good

    class PriceInput extends React.Component {
      constructor(props) {
        super(props);

        const value = this.props.value || {};
        this.state = {
          number: value.number || 0,
          currency: value.currency || 'rmb',
        };
      }
      componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
          const value = nextProps.value;
          this.setState(value);
        }
      }
      handleNumberChange = (e) => {
        const number = parseInt(e.target.value || 0, 10);
        if (isNaN(number)) {
          return;
        }
        if (!('value' in this.props)) {
          this.setState({ number });
        }
        this.triggerChange({ number });
      }
      handleCurrencyChange = (currency) => {
        if (!('value' in this.props)) {
          this.setState({ currency });
        }
        this.triggerChange({ currency });
      }
      triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
          onChange(Object.assign({}, this.state, changedValue));
        }
      }
      render() {
        const { size } = this.props;
        const state = this.state;
        return (
          ...
        );
      }
    }
    ```

## Mixins

  - [不要使用 mixins](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html).

  > 为什么? Mixins 会增加隐式的依赖，导致命名冲突，并且会以雪球式增加复杂度。在大多数情况下Mixins可以被更好的方法替代，如：组件化，高阶组件，工具模块等。