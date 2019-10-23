## jQuery

- [26.1](#jquery--dollar-prefix) 推荐对jquery对象命名使用`$`前缀. jscs: [`requireDollarBeforejQueryAssignment`](http://jscs.info/rule/requireDollarBeforejQueryAssignment)

  ```javascript
  // bad
  const sidebar = $('.sidebar');

  // good
  const $sidebar = $('.sidebar');

  // good
  const $sidebarBtn = $('.sidebar-btn');
  ```

- [26.2](#jquery--cache) 缓存jquery dom对象.

  ```javascript
  // bad
  function setSidebar() {
    $('.sidebar').hide();

    // ...

    $('.sidebar').css({
      'background-color': 'pink',
    });
  }

  // good
  function setSidebar() {
    const $sidebar = $('.sidebar');
    $sidebar.hide();

    // ...

    $sidebar.css({
      'background-color': 'pink',
    });
  }
  ```

- [26.3](#jquery--queries) 对 DOM 查询使用层叠 $('.sidebar ul') 或 父元素 > 子元素 $('.sidebar > ul'). [jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)

- [26.4](#jquery--find) 对有作用域的 jQuery 对象查询使用 find.

  ```javascript
  // bad
  $('ul', '.sidebar').hide();

  // bad
  $('.sidebar').find('ul').hide();

  // good
  $('.sidebar ul').hide();

  // good
  $('.sidebar > ul').hide();

  // good
  $sidebar.find('ul').hide();
  ```
