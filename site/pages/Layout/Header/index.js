import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import Menu from './Menu';
import styles from './index.less';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { routes, resumeRoute = {}, sysName, breadcrumbs, isMobile, collapsed, onCollapse } = this.props;
    const resumePath = resumeRoute.childrens[0].key;

    return isMobile
      ? (
        <div className={styles.header}>
          <Link to={resumePath}>
            <div className="logoIcon"><span>录康</span></div>
          </Link>
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
          <Link to={resumePath}>
            <div className="logo"><span>{sysName}</span></div>
          </Link>
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
