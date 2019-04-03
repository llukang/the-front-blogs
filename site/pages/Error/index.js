import React from 'react';

class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        对不起，您查看的页面不存在
      </div>
    );
  }
}

export default ErrorPage;
