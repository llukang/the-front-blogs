# `input[file]` 标签问题

## `input[file]` 微信支持相册，相机选择调用，部分图片无法选择

#### 问题原因

`input[file]` 标签 `accept` 属性设置问题，

#### 示例代码(错误):

```html
<input
  type="file"
  accept="accept=”image/gif,image/jpeg,image/jpg”"
  multiple="{false}"
  key="{fileId}"
  ref="{this.saveFileInput}"
  onChange="{this.handleFileChange}"
/>
```

#### 解决方案：

`input[file]` 标签 设置为`accept="image/*"`

> input[file] 中使用 accept=”image/\*” 会导致打开相册响应慢问题


## input 重复选择一张图片问题

#### 问题原因

`input`的 多次选择同一张图片是不会触发`onChange`事件

#### 解决方案：

 选择文件后重置`input[file]` 的 `value`

 > 对于vue 或者react而言，可以采用key的形式生成不同的input[file] 标签