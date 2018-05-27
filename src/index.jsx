import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './Components/App';
import Secret from './Components/Secret';
import Login from './Components/Login';

const Main = () => (
  <BrowserRouter>
    <Switch>
    	<Route exact path="/" component={App} />
      <Route path="/auth/login" component={Login} />
      <Route path="/user" component={Secret} />
    </Switch>
  </BrowserRouter>
);

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Main />,document.getElementById('app'));
});
