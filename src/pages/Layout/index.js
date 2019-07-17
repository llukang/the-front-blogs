import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import routes from 'configs/routes';
import { getBreadcrumbs, throttle } from 'utils';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import SiderMenu from './SiderMenu';

import styles from './index.less';

const mobileWidth = 800;

// 不展示模板
const excludeRoute = [];

// 导航router
const menuRoutes = routes.filter(({ name }) => {
  return !excludeRoute.includes(name);
});

class HLayout extends React.PureComponent {
  handleResize = throttle(() => {
    this.setState({ isMobile: window.innerWidth <= mobileWidth });
  }, 300)

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      isMobile: window.innerWidth <= mobileWidth,
    };
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleCollapse(collapsed) {
    this.setState({ collapsed });
  }

  renderBody(subRoutes, breadcrumbs) {
    const { isMobile } = this.state;
    const bodyProps = {
      isMobile,
      breadcrumbs,
      routes: subRoutes,
    };
    return props => (<Body {...props} {...bodyProps} />);
  }

  render() {
    const { location: { pathname } } = this.props;
    const { isMobile, collapsed } = this.state;
    const breadcrumbs = getBreadcrumbs(routes, pathname);
    const documentTitle = breadcrumbs.map(({ name }) => { return name; }).join('/');
    const sysName = '学习笔记';
    const headerProps = {
      sysName,
      isMobile,
      collapsed,
      routes: menuRoutes,
      breadcrumbs,
      onCollapse: this.handleCollapse
    };

    const siderMenuProps = {
      sysName,
      isMobile,
      collapsed,
      routes: menuRoutes,
      breadcrumbs,
      onCollapse: this.handleCollapse
    };

    return (
      <DocumentTitle title={documentTitle}>
        <div className={styles.layout}>
          <Header {...headerProps} />
          <div className="body">
            <Switch>
              {
                routes.map(({ childrens, key }) => {
                  return <Route key={key} path={key} render={this.renderBody(childrens, breadcrumbs)} />;
                })
              }
              {!!routes[0] && <Redirect to={routes[0].key} />}
            </Switch>
          </div>
          <Footer />
          <SiderMenu {...siderMenuProps} />
        </div>
      </DocumentTitle>
    );
  }
}

export default withRouter(HLayout);
