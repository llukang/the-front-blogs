import React from 'react';
import ReactDOM from 'react-dom';
import showdown from 'showdown';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import less from 'highlight.js/lib/languages/less';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('less', less);

const transFormMarkDown = (markdownText) => {
  const converter = new showdown.Converter();
  if (markdownText) {
    return converter.makeHtml(markdownText);
  }
  return '';
};

class Md2Html extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlStr: transFormMarkDown(props.markdown)
    };
    this.handleSaveRef = this.handleSaveRef.bind(this);
    this.updateCodeStyle = this.updateCodeStyle.bind(this);
  }

  componentDidMount() {
    this.updateCodeStyle();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.markdown !== this.props.markdown) {
      this.setState({
        htmlStr: transFormMarkDown(nextProps.markdown)
      });
    }
  }

  componentDidUpdate() {
    this.updateCodeStyle();
  }

  updateCodeStyle() {
    // eslint-disable-next-line
    const markdownNode = ReactDOM.findDOMNode(this.markdown);
    const codeNodes = markdownNode.querySelectorAll('pre code');
    [...codeNodes].forEach((codeNode) => {
      hljs.highlightBlock(codeNode);
    });
  }

  handleSaveRef(ref) {
    this.markdown = ref;
  }

  render() {
    const { htmlStr } = this.state;
    return (
      <div
        className="markdown-body"
        id="markDownText"
        ref={this.handleSaveRef}
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{ __html: htmlStr }}
      />
    );
  }
}

export default Md2Html;
