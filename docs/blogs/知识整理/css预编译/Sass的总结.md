## Sass 的总结

#### 1.变量的声明使用`$`

```scss
$color: red; //普通变量(全局变量)
$color: #dedede !default; // 默认变量
p {
  $width: 100px;
  (局部变量)color: $color;
  a {
    display: inline-block;
    width: $width;
  }
}
```

#### 2.嵌套

```scss
//选择器嵌套
.container {
  .content {
    a {
      font-size: 12px;
    }
  }
}
//属性嵌套
.header {
  font: {
    size: 14px;
    weight: bold;
  }
  border: {
    top: 1px solid #deded;
    left: 3px solid #fff;
  }
}
//伪类嵌套
.box {
  &::after {
    content: "";
    clear: both;
  }
}
```

#### 3.宏定义`@mixin`

```scss
//定义调用混合宏
@mixin border-radius {
  border: 1px solid #dedede;
  border-radius: 100%;
}
.box {
  @include border-radius;
}

//传参
@mixin size($width: 200px, $height: 50px) {
  width: $width;
  height: $height;
}
.box {
  @include size(100px);
}
```

#### 4.继承`@extend`，占位符`%placeholder`

```scss
//继承
.box {
  width: 100px;
  height: 50px;
}
.btn {
  @extend .box;
  color: #ddd;
}
//占位符
%size {
  width: 100px;
  height: 50px;
}
.box {
  @extend %size;
}
```

#### 5.计算

```scss
//计算
.box {
  width: (100px/20);
  height: 100px - 10px;
}
```

#### 6. 控制命令`@if,@each,@while,@for`

```scss
// @if
@mixin toggle($show: true) {
  @if $show {
    display: block;
  } @else {
    display: none;
  }
}
.box {
  @include toggle(true);
}

// @for
// from 1 throuth 10 => [1,10];
// from 1 to 10 => [1,9];
// #{} 插入值
@for $item from 1 through 10 {
  .span#{$item} {
    display: inline-block;
  }
}

// @while
$num: 5;
$default-width: 20px;
@while $num > 0 {
  .div-#{$num} {
    width: $default-width * $num;
  }
  $num: $num-1;
}

// @each
$url-List: 1 2 3 4;
%image-url {
  @each $url in $url-list {
    .img-#{$url} {
      backgroud: url(#{$url}) no-repeat;
    }
  }
}
.box {
  @extend $images-url;
}
```

#### 7 .自定义函数`@function`

```scss
@function method($val) {
  @return $val * 2;
}
.box {
  width: method(50px);
}
```

### 反馈与建议

- 开源中国：[@刘录康](http://git.oschina.net/liulukang)
- 邮箱：<275432465@qq.com>
