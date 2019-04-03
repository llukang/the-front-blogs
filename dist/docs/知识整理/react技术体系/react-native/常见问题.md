## react-native 常见问题

#### Image 组件问题

- 内部图片，默认展示原始图片宽高
- 外部图片，必须设置宽高，否则宽高为 0
- Android 下，图片圆角不起作用 ？？？

#### Text 组件问题

- `RN`文本展示必须使用 `Text` 组件
- `RN`其他组件样式没有作用域概念，`Text`组件嵌套有样式作用域
- 独占一行，可设置字体相关样式，其他组件不能设置

#### InputText 组件问题

- `android` 与 `ios` 默认 `padding` 与 `margin` 不一致

#### ScrollView 组件问题

- `ScrollView` 嵌套导致滚动条失效

#### StyleSheet 组件问题

- `flex` 布局方式与 `web flex` 布局相反
- `android` 环境 `overflow:hidden`问题
- `ios` 字体 `fontSize` 放大导致溢出，设置 `lineHeight` 导致

#### 交互问题

- 注意手机状态栏高度以及刘海屏`StatusBar && Platform.Version`
- 键盘弹起注意遮挡问题 `KeyboardAvoidingView`
- 页面跳转注意收起键盘 `Keyboard.dismiss();`

#### 性能优化

- 图片加载，使用 `FastImage` 缓存问题，需要 `native` 配合

#### 其他问题

- `ios` 手势返回问题

  `ios` 可以通过手势返回上级页面，RN 环境中可以通过`react-navigatiin`设置`gesturesEnabled: false,`禁用。如果 RN 为首页，需 `native` 配合禁用当前页手势

- `android` 数字键盘问题

  `Android` 数字键盘有返回按钮，可以调用标准输入法输入拼音汉字，需要对输入结果进行校验

- `android` 低版本卡顿

  `Android`低版本，点击事件触发可能卡顿，导致重复点击问题，需要使用`throttle`进行优化处理

- `react-navagition` 路由

  此路由控制与`react-router-dom` 不一致，前进并不会移除上个页面触发`componentWillUnmount`，返回已存在页面亦不会触发`componentDidMount` 钩子函数
