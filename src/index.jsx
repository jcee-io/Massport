import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Secret from './Components/Secret';
import Login from './Components/Login';

class Main extends Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth/login" component={Login} />
          <Route path="/user" component={Secret} />
        </Switch>
      </BrowserRouter>
    );
  }
}

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Main />,document.getElementById('app'));
});
