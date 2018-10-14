import { Dashboard, StaticMirror } from './containers/index.js'
import InitializeApp from './InitializeApp.js';

import createStore from './redux/create.js';

import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as React from 'react';

type Props = {};

export default class App extends React.Component<Props> {

  render() {
    return (
      <Provider store={createStore()}>
        <Router>
          <div className="full">
            <InitializeApp />
            <Route exact path="/" component={StaticMirror} />
            <Route path="/dashboard" component={Dashboard} />
          </div>
        </Router>
      </Provider>
    );
  }
}

