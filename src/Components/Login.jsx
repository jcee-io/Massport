import React, { Component } from 'react';


class Login extends Component {
	render() {
		return (
		  <div>
		    <h1>This is the login page</h1>
        <a href="/auth/google">Login With Google</a>
				<a href="/auth/facebook">Login With Facebook</a>
		  </div>
		);
	}
}

export default Login;
