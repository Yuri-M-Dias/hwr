import React from 'react';
import ReactDOM from 'react-dom';
import Detail from './pages/Detail.js';
import { Router, Route, IndexRoute, Link } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import List from './pages/List.js';

const history = createBrowserHistory();

ReactDOM.render(
  (
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <div>
        <Route exact path="/" component={List} />
        <Route path="/react" component={Detail} />
      </div>
    </Router>
  ),
  document.getElementById('app'),
);

