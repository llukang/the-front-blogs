

import React, { PureComponent } from 'react';
import { Breadcrumb } from 'antd';
import { removeFileExtension } from 'utils';
import styles from './index.less';

class HBreadcrumb extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { breadcrumbs } = this.props;

    return (
      <div className={styles.breadcrumbContainer}>
        <Breadcrumb>
          {
            breadcrumbs.map(({ key, name }) => {
              return <Breadcrumb.Item key={key}>{removeFileExtension(name)}</Breadcrumb.Item>;
            })
          }
        </Breadcrumb>
      </div>
    );
  }
}

export default HBreadcrumb;
