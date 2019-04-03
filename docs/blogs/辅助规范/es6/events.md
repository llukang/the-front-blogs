## Events

- [25.1](#events--hash) 当给事件附加数据时, 传入一个数据对象而不是原始值, 以方便后续扩展:

  ```javascript
  // bad
  $(this).trigger('listingUpdated', listing.id);

  // ...

  $(this).on('listingUpdated', (e, listingId) => {
    // do something with listingId
  });
  ```

  prefer:

  ```javascript
  // good
  $(this).trigger('listingUpdated', { listingId: listing.id });

  // ...

  $(this).on('listingUpdated', (e, data) => {
    // do something with data.listingId
  });
  ```
