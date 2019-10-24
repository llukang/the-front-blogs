import React, { PureComponent } from 'react';
import styles from './index.less';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.footer}>
        <h3>反馈与建议</h3>
        <div className="footerLinks">
          <div className="linkItem">
            <span>邮箱:</span>
            <a href="https://mail.google.com">lukang.liu@gmail.com</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
