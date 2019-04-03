import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import styles from './index.less';

class HMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { routes, breadcrumbs = [] } = this.props;
    const selectedKeys = breadcrumbs.map(({ key }) => {
      return key;
    });
    return (
      <div className={styles.menu}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={selectedKeys}
        >
          {
            routes.map(({ key, name }) => {
              return (
                <Menu.Item key={key}><Link to={key}>{name}</Link></Menu.Item>
              );
            })
          }
        </Menu>
      </div>
    );
  }
}

export default HMenu;
