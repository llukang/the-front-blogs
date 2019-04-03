
import React from 'react';
import { Spin } from 'antd';

import Md2Html from 'components/Md2Html';
import { request } from 'utils';

import styles from './index.less';

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      markdown: '',
    };
  }

  componentWillMount() {
    this.getDoc();
  }

  async getDoc() {
    const { mdPath } = this.props;
    this.setState({ spinning: true });
    const markdown = await request(mdPath);
    this.setState({ markdown, spinning: false });
  }

  render() {
    const { markdown, spinning } = this.state;
    return (
      <div className={styles.detail}>
        <Spin spinning={spinning}>
          <Md2Html markdown={markdown} />
        </Spin>
      </div>
    );
  }
}

export default Comp;
