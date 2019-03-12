import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router';

export const history = createHistory();

export default class BrowserRouter extends React.Component {
  render() {
    return <Router history={history} children={this.props.children} />;
  }
}
