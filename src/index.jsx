import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import Secret from './Components/Secret';
import Login from './Components/Login';
import EmailExists from './Components/EmailExists';
import SignUp from './Components/SignUp';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      user: null
    }
  }
  componentDidMount() {
    fetch('/auth/status', { credentials: 'same-origin'})
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          isLoggedIn: data.isLoggedIn,
          user: data.user
        });
      });
  }
  render() {
    const { user } = this.state;

    return(
      <div>
        <Header {...this.state} />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/auth/login" component={Login} />
            <Route path="/user" component={Secret} />
            <Route path="/error/exists" component={EmailExists} />
            <Route path="/auth/signup" component={SignUp} />
            <Route path="*" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Main />,document.getElementById('app'));
});
