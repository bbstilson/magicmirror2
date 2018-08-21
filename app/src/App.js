import { Dashboard, Mirror } from './containers/index.js'

import createStore from './redux/create.js';

import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={createStore()}>
        <Router>
          <div className="full">
            <Route exact path="/" component={Mirror} />
            <Route path="/dashboard" component={Dashboard} />
          </div>
        </Router>
      </Provider>
    );
  }
}
