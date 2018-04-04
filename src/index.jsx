import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './Components/App';
 
const Main = () => (
  <BrowserRouter>
    <Switch>
    	<Route exact path="/" component={App} />
    	<Route exact path="/:parkId" component={App} />
    </Switch>
  </BrowserRouter>
);

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Main />,document.getElementById('app'));
});