

import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import DetailPage from 'pages/DetailPage';
import ErrorPage from 'pages/Error';
import { getMdRouters } from 'utils';
import Menu from './Menu';
import HBreadcrumb from './HBreadcrumb';

const renderPage = (Component, mdPath) => {
  return (props) => {
    return (
      <Component mdPath={mdPath} {...props} />
    );
  };
};

class Body extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { routes = [], breadcrumbs, isMobile } = this.props;
    const routers = getMdRouters(routes);
    return (
      <Fragment>
        {
          !isMobile && (
            <div className="sider">
              <Menu breadcrumbs={breadcrumbs} navs={routes} />
            </div>
          )
        }
        <div className="subLayout">
          <HBreadcrumb breadcrumbs={breadcrumbs} />
          <div className="content">
            <Switch>
              {
                routers.map(({ key, mdPath }) => {
                  return <Route exact key={key} path={key} render={renderPage(DetailPage, mdPath)} />;
                })
              }
              <Redirect to={routers[0].key} />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Body;
