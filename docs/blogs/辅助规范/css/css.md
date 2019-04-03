## CSS编码规范

----------

### 目录

 1. [通用](#通用)
 2. [格式](#格式)
 3. [样式声明顺序](#样式声明顺序)
 4. [选择器](#选择器)
 5. [id选择器](#id选择器)
 6. [JavaScript钩子](#Javascript钩子)
 5. [其他](#其他)
 
### 通用

- **[建议]** css文件使用无BOM的UTF-8编码，文件首行加上`@charset "utf-8";`。

- **[强制]** css文件中禁止使用`@import`导入css文件。

- **[强制]** 禁止使用`Expression`。


### 格式
* 使用2个空格作为缩进。
* 在一个规则声明中应用了多个选择器时，每个选择器独占一行。
* 在规则声明的左大括号 { 前加上一个空格。
* 在属性的冒号 : 后面加上一个空格，前面不加空格。
* 规则声明的右大括号 } 独占一行。
* 属性超过一条时定义另起一行。

```css
/* bad */
.avatar{
    border-radius:50%;
    border:2px solid white; }
.no, .nope, .not-good {
    // ...
}
.selector { margin: 0; padding: 0; }

/* good */
.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.nope,
.not-good {
  // ...
}

.selector {
    margin: 0;
    padding: 0;  
}
```

### 样式声明顺序
- **[建议]** 根据css样式的属性，可以归为两大类：
 - 定位属性（影响文档流布局）
    -- 定位(Positioning) 
    -- 盒子模型(Box model)

 - 自身属性（不影响文档流布局）
    -- 印刷样式(Typographic)
    -- 图像样式(Visual)
    
    好处：查看节点样式代码时，方便快速定位节点在文档中所处位置和尺寸

```css
.declaration-order {
    /* Positioning */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    /* Box-model */
    z-index: 100;
    display: block;
    float: right;
    width: 100px;
    height: 100px;

    /* Typography */
    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    color: #333;
    text-align: center;
    
    /* Visual */
    background-color: #f5f5f5;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    opacity: 1; 
}
```

### 选择器
- **[建议]** 避免使用属性选择器`[class^="..."]`，会存在性能问题。

- **[建议]** 选择器的嵌套层级应`不大于3级`，位置靠后的限定条件应尽可能精确。

- **[建议]** 在可以使用缩写的情况下，尽量使用属性缩写。

- **[强制]** 字体必须使用英文，引号包裹。

```css
font-family: "Arial", "sans-serif", "Microsoft Yahei";
```

- **[强制]** 如无必要，不得为 id、class 选择器添加类型选择器进行限定。

> 在性能和维护性上，都有一定的影响。

```css
/* bad */
p.error {
    color: red;
}
/* good */
.error {
    color: red;
}
```

### id选择器

在 CSS 中，虽然可以通过 ID 选择元素，但大家通常都会把这种方式列为反面教材。ID 选择器给你的规则声明带来了不必要的高优先级，而且 ID 选择器是不可重用的。


### JavaScript 钩子
- **[强制]** 选择器尽量用class，id作为js预留钩子。
- **[建议]** 当class需要作为js预留钩子，命名时请以`js-`开头

```html
/* bad */
<button class="btn request-to-book">Request to Book</button>
/* good */
<button class="btn btn-white js-request-to-book">Request to Book</button>
```

## 其他
- **[强制]** `url()`函数中的路径加引号。

```css
/* bad */
.bg {
    background: url(./../images/bg.png) no-repeat;
}
/* good */
.bg {
    background: url("./../images/bg.png") no-repeat;
}
```

- **[建议]** 当数值为 0 - 1 之间的小数时，省略整数部分的 `0`。
    
```css
/* bad */
.mask {
    opacity: 0.5;
}
/* good */
.mask {
    opacity: .5;
}
```

- **[建议]** `url()`函数中的绝对路径可省去协议名。

```css
body {
    background: url("//s.56qq.com/images/bg.png") no-repeat;
}
```

- **[建议]** 在定义无边框样式时，使用 0 代替 none。

```css
/*bad*/
.foo {
  border: none;
}
/*good*/
.foo {
   border: 0;
}
```