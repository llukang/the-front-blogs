## react-native 组件的使用

## UI组件
  - `View`组件


## 常用知识点

  - 特定平台扩展名, 及平台检测
    - 检测某个文件是否具有 `.ios.` 或是 `.android.` 的扩展名，加载当期运行平台对应的文件

      ```javascript
        // BigButton.ios.js
        // BigButton.android.js

        import BigButton from './components/BigButton';
      ```
     - 平台检测 `Platform` 组件

        ```javascript

          import { Platform, StyleSheet } from 'react-native';、

          // 根据不同平台加载不同组件

          var Component = Platform.select({
            ios: () => require('ComponentIOS'),
            android: () => require('ComponentAndroid'),
          })();

          // Platform.OS 返回 ios/android

          var styles = StyleSheet.create({
            height: (Platform.OS === 'ios') ? 200 : 100,
          });

          // Platform.Version 检测安卓版本

          if(Platform.Version === 21){
            console.log('Running on Lollipop!');
          }

        ```

    
   


## 技术博客

## 参考文档
