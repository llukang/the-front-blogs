import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader'; // eslint-disable-line
import Layout from 'pages/Layout';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Layout} />
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(App);
