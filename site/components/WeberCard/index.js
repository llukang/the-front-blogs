import { Card } from 'antd';
import classname from 'classname';

import { styles } from './index.less';

class WeberCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleDropClick = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  }

  render() {
    const { visible } = this.state;
    const { title, content, demoComponent, code } = this.props;

    return (
      <Card className={styles.weberCard}>
        <div className="demo">
          {demoComponent}
        </div>
        <div className="title">
          <span>{title}</span>
          <p>{content}</p>
          <div
            className={classname({ 'drop-btn': true, active: visible })}
            onClick={this.handleDropClick}
          />
        </div>
        <div
          className={classname({
            code: true,
            show: visible,
            hide: !visible,
          })}
        >
          <pre>
            <code className="language-jsx">{code}</code>
          </pre>
        </div>
      </Card>
    );
  }
}

export default WeberCard;
