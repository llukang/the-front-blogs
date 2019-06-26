import React, { PureComponent } from 'react';
import { Icon } from 'antd';

import Menu from './Menu';
import styles from './index.less';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { routes, sysName, breadcrumbs, isMobile, collapsed, onCollapse } = this.props;

    return isMobile
      ? (
        <div className={styles.header}>
          <div className="logoIcon"><span>录康</span></div>
          <div className="navContianer">
            <Icon
              type={!collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={(() => { onCollapse(true); })}
            />
          </div>
        </div>
      )
      : (
        <div className={styles.header}>
          <div className="logo"><span>{sysName}</span></div>
          <div className="navContianer">
            <Menu
              routes={routes}
              breadcrumbs={breadcrumbs}
            />
          </div>
        </div>
      );
  }
}

export default Header;
