import React from 'react';
import { Router } from 'react-router-dom';

import Loading from '~/components/loading';

import { createBrowserHistory } from 'history';

import Routes from './routes';


export const history = createBrowserHistory();
class AppRouter extends React.PureComponent {

  render() {
    return (
      <Router history={history}>
        <div className="page-wrapper">
          <Loading />
          <Routes /> 
        </div>
      </Router>
    );
  }
}


export default AppRouter;
