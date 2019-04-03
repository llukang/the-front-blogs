import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { removeFileExtension } from 'utils';

const { SubMenu, Item } = Menu;

const getMenuKeys = (breadcrumbs) => {
  const keys = breadcrumbs.map(({ key }) => {
    return key;
  });
  const selectedKeys = keys.pop();
  return { openKeys: keys, selectedKeys: [selectedKeys], };
};

class SiderMenu extends PureComponent {
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
      return <Item key={key}><Link to={key}>{removeFileExtension(name)}</Link></Item>;
    });
  };

  render() {
    const { navs } = this.props;
    const { openKeys, selectedKeys } = this.state;
    return (
      <Menu
        mode="inline"
        theme="light"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={this.handleOpenChange}
      >
        {this.renderMenus(navs)}
      </Menu>
    );
  }
}
export default SiderMenu;
