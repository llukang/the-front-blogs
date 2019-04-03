# Chrome Extension 开发

## 什么是Chrome扩展程序？

Web开发人员使用`HTML, CSS, JavaScript` 等技术为Chrome创建新的扩展,添加功能，而无需深入了解`native`代码。

## 最少结构

- `manifest.json` 元文件
- `newtab.html` HTML文件
- `icon.png`	  图标文件

## 元文件 manifest.json

JSON格式的元数据文件，其中包含扩展名，描述，版本号等属性。在此文件中，我们会告诉Chrome扩展程序要执行的操作以及所需的权限。

```json
  {
    "manifest_version": 2,
    "name": "RaterFox",
    "description": "The most popular movies and TV shows in your   default tab. Includes ratings, summaries and the ability to watch trailers.",
    "version": "1",
    "author": "Jake Prins",
    "browser_action": {
      "default_icon": "icon.png", // 地址栏图片
      "default_title": "Have a good day", // 地址栏名称
      "default_popup": "popup.html", // 地址栏操作视图
    },
    "chrome_url_overrides" : {
      "newtab": "newtab.html", // 插件内容
    },
    "permissions": ["activeTab"]
  }
```

## 发布扩展程序

## 参考

- [编写第一个Chrome Extension](https://juejin.im/post/5c03ed44e51d456ac27b48c4)
- [ How to Create and Publish a Chrome Extension in 20 minutes](https://medium.freecodecamp.org/how-to-create-and-publish-a-chrome-extension-in-20-minutes-6dc8395d7153)