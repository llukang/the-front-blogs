## PropTypes

### 概论
  对组件`props`进行类型检查，减少因为类型而产生的bug

### 基本使用

```javascript
  import PropTypes from 'prop-types';

  class Greeting extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>
    }
  };

  // 编写类型检查
  Greeting.propTypes = {
    name: PropTypes.string
  }

```

### 常用类型检查

```javascript
  import PropTypes from 'prop-types';

  Greeting.propTypes = {
    // 常规数据类型
    optionalString: PropTypes.string,
    optionalNumber: PropTypes.number,
    optionalBool: PropTypes.bool,
    optionalSymbol: PropTypes.symbol,
    optionalObject: PropTypes.object,
    optionalArray: PropTypes.array,
    optionalFunc: PropTypes.func,

    // 可被 render 值：numbers, strings, elements or an array
    optionalNode: PropTypes.node, 

    // React element.
    optionalElement: PropTypes.element,

    // 枚举属性
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),

    // 对象类型是指定枚举值
    optionalUnion: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Message)
    ]),

    // 数组值为指定类型
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // 对象值为指定类型
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),

    // 对象具有指定的数据结构与值类型
    optionalObjectWithShape: PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number
    }),

    // 可以与其他数据类型链接使用
    // 值为函数且不能为空
    requiredFunc: PropTypes.func.isRequired,

    // 值为任意类型不能为空
    requiredAny: PropTypes.any.isRequired,

    // 自定义校验工具
    // 如果检查失败，它应该返回一个Error对象,不要`console.warn`或throw。
    customProp: function(props,propName,componentName){
      if (!/matchme/.test(props[propName])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    },

    // 自定义校验 数组或对象中的每个键，调用验证函数
    customArrayProp:  React.PropTypes.arrayOf(function(propValue,key,componentName,location,propFullName){
      if (!/matchme/.test(propValue[key])) {
        return new Error(
          'Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    })
  }
```

### 参考文档

- [prop-types](https://www.npmjs.com/package/prop-types)
