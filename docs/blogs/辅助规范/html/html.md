
## HTML编码规范

-----

### 目录

1. [通用](#通用)
2. [代码风格](#代码风格)
3. [图片](#图片)
4. [表单](#表单)

### 通用

- 页面模式

**[强制]** 使用html5的`doctype`来启用标准模式，建议使用大写的 DOCTYPE。

**[强制]** 页面必须使用精简形式，明确指定字符编码。指定字符编码的 meta 必须是 head 的第一个直接子元素。

**[强制]** 页面必须包含 title 标签声明标题。

**[建议]** 启用 IE Edge 模式。

**[建议]** 在 html 标签上设置正确的 lang 属性。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    ......
    <title>页面标题</title>
    ......
</head>
<body>
    ......
</body>
</html>
```

- favicon

**[强制]** 保证`favicon`可访问

> 在未指定 favicon 时，大多数浏览器会请求 Web Server 根目录下的 favicon.ico 。为了保证favicon可访问，避免404，必须遵循以下两种方法之一：
1. 在 Web Server 根目录放置 favicon.ico 文件。
2. 使用 link 指定 favicon。


- CSS 和 JavaScript 引入

**[强制]** 引入 CSS 时必须指明 rel="stylesheet"。

```html
<link rel="stylesheet" href="page.css">
```

**[建议]** 引入 CSS 和 JavaScript 时无须指明 type 属性。

>text/css 和 text/javascript 是 type 的默认值。

**[建议]** 在 head 中引入页面需要的所有 CSS 资源。

>在页面渲染的过程中，新的CSS可能导致元素的样式重新计算和绘制，页面闪烁。

**[建议]** JavaScript 应当放在页面末尾，或采用异步加载。

>将 script 放在页面中间将阻断页面的渲染。出于性能方面的考虑，如非必要，请遵守此条建议。

- IE Style Fixed

**[建议]** 为兼容IE9及以下浏览器样式，有必要在head中使用CSS if IE条件注释。
 
 ```html
 <!--[if lt IE 9]>
<html lang="en" class="ie8">
<![endif]-->
<!--[if gt IE 8]>
<html lang="en">
<![endif]-->
<!-- IE8 fixed -->
<!--[if lt IE 9]>
<link rel="stylesheet" href="<?php echo STATICURL; ?>/css/iefix.css?<?php echo VERHASH; ?>"/>
<![endif]-->
 ```

### 代码风格
 - 缩进与换行
 
**[强制]** 使用` 4 `个空格作为缩进。

```html
<style>
/* 样式内容的第一级缩进与所属的 style 标签对齐 */
ul {
    padding: 0;
}
</style>
<ul>
    <li>first</li>
    <li>second</li>
</ul>
<script>
// 脚本代码的第一级缩进与所属的 script 标签对齐
seajs.use('app', function (app) {
    app.init();
});
</script>
```

 - 命名

**[强制]** class 必须单词全字母小写，单词间以 - 分隔。

**[强制]** 元素 id 必须保证页面唯一

**[强制]** class 必须代表相应模块或部件的内容或功能，不得以样式信息进行命名。
 
```html
/* bad */
<div class="left"></div>

/* good */
<div class="sidebar"></div>
```

- 标签

**[强制]** `标签名`必须使用小写字母。

```html
 /* bad */
<P>Hello StyleGuide!</P>

/* good */
<p>Hello StyleGuide!</p>
```
**[强制]** 标签使用必须符合标签嵌套规则。

> 比如 div 不得置于 p 中，tbody 必须置于 table 中，a 中不得嵌套 a。

**[强制]** 属性名必须使用小写字母，属性值必须用双引号。

```html
/* bad */
<table cellSpacing='0'>...</table>

/* good */
<table cellspacing="0">...</table>
```
**[建议]** 布尔类型的属性，建议不添加属性值。

```html
<input type="text" disabled>
<input type="checkbox" checked>
```

**[建议]** 自定义属性建议以 xxx- 为前缀，推荐使用 data-。

> 解释：使用前缀有助于区分自定义属性和标准定义的属性。

```html
<ol data-ui-type="Select"></ol>
```  

**[建议]** 对于无需自闭合的标签，也需要自闭合。

```html
<!-- bad -->
<meta charset="utf-8">
<input type="text" name="title">    

<!-- good -->
<meta charset="utf-8" />
<input type="text" name="title" />
```

**[建议]** 标签的使用应尽量简洁，减少不必要的标签。

```html
/* bad */
<span class="avatar">
<img src="image.png">
</span>

/* good */
<img class="avatar" src="image.png">
```

### 图片

**[强制]** 禁止`img`的`src`取值为空。延迟加载的图片也要默认的`src`

> src 取值为空，会导致部分浏览器重新加载一次当前页面，参考：[https://developer.yahoo.com/performance/rules.html#emptysrc](https://developer.yahoo.com/performance/rules.html#emptysrc)

**[建议]** 避免为`img`添加不必要的`title`属性。

> 多余的 title 影响看图体验，并且增加了页面尺寸。

**[建议]** 添加`width`和`height`属性，以避免页面抖动。

**[建议]** 有下载需求的图片采用 img 标签实现，无下载需求的图片采用 CSS 背景图实现。

> 1.产品 logo、用户头像、用户产生的图片等有潜在下载需求的图片，以 img 形式实现，能方便用户下载。
2.无下载需求的图片，比如：icon、背景、代码使用的图片等，尽可能采用 CSS 背景图实现。

### 表单

- 按钮

**[强制]** 使用 button 元素时必须指明 type 属性值。

>button 元素的默认 type 为 submit，如果被置于 form 元素中，点击后将导致表单提交。为显示区分其作用方便理解，必须给出 type 属性。

```html
<button type="submit">提交</button>
<button type="button">取消</button>
```