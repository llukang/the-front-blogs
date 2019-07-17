import React from 'react';
import { Drawer, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { removeFileExtension } from 'utils';

import styles from './index.less';

const { SubMenu, Item } = Menu;

const getMenuKeys = (breadcrumbs) => {
  const keys = breadcrumbs.map(({ key }) => {
    return key;
  });
  const selectedKeys = keys.pop();
  return { openKeys: keys, selectedKeys: [selectedKeys], };
};

class SiderMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    const { openKeys, selectedKeys } = getMenuKeys(props.breadcrumbs);
    this.state = { openKeys, selectedKeys, };
    this.handleOpenChange = this.handleOpenChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.breadcrumbs !== this.props.breadcrumbs) {
      const { openKeys, selectedKeys } = getMenuKeys(nextProps.breadcrumbs);
      this.setState({ openKeys, selectedKeys });
    }
  }

  handleOpenChange(openKeys) {
    this.setState({ openKeys });
  }

  renderMenus = (menu) => {
    const { onCollapse } = this.props;
    return menu.map(({ name, childrens, key }) => {
      if (childrens && childrens.length) {
        return (
          <SubMenu
            key={key}
            title={name}
          >
            {this.renderMenus(childrens)}
          </SubMenu>
        );
      }
      return <Item key={key} onClick={() => { onCollapse(false); }}><Link to={key}>{removeFileExtension(name)}</Link></Item>;
    });
  };

  render() {
    const { sysName, routes, collapsed, onCollapse } = this.props;
    const { openKeys, selectedKeys } = this.state;
    return (
      <Drawer
        visible={collapsed}
        placement="left"
        onClose={() => onCollapse(false)}
        style={{ padding: 0, height: '100vh' }}
        className={styles.siderMenu}
      >
        <div className="logo"><span>{sysName}</span></div>
        <Menu
          mode="inline"
          theme="light"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={this.handleOpenChange}
        >
          {this.renderMenus(routes)}
        </Menu>
      </Drawer>
    );
  }
}
export default SiderMenu;
