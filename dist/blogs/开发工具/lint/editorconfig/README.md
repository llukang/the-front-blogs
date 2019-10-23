# editorconfig

**统一不同编辑器，文件格式问题**

`EditorConfig` 用于定义编码样式,文件格式,有助于为跨越各种编辑器和 IDE ，在同一项目的多个开发人员维护一致的编码样式。

`.editorconfig`s 文件

```bash
# 表明这是最顶层的配置文件，这样才会停止继续向上查找 .editorconfig 文件；
# 查找的 .editorconfig 文件是从顶层开始读取的，类似变量作用域的效果，内部
# 的 .editorconfig 文件属性优先级更高
root = true

# 指定作用文件格式
[*]

# 缩进的类型 [space | tab]
indent_style = space

# 缩进的大小
# tab_width: 设置整数用于指定替代tab的列数。默认值就是indent_size的值，一般无需指定。
indent_size = 2

# 单个tabs 字符的宽度
tab_width= 60

# 定义换行符 [lf | cr | crlf]
end_of_line = lf

# 编码格式。支持latin1、utf-8、utf-8-bom、utf-16be和utf-16le，不建议使用uft-8-bom。
charset = utf-8

# 是否除去换行行首的任意空白字符
trim_trailing_whitespace = false

# 文件是否以一个空白行结尾 [true | false]
insert_final_newline = true

# 其他属性，由有限数量的编辑支持
# 在指定的字符数量后强制强行换行
max_line_length = 120

```

### 其他

- [editorconfig 文档](http://editorconfig.org)
- [editorconfig 配置](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties)
