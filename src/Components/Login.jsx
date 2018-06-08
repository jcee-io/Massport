import React, { Component } from 'react';


class Login extends Component {
	render() {
		return (
		  <div>
		    <h1>This is the login page</h1>
        <a href="/auth/google">Login With Google</a>
				<a href="/auth/facebook">Login With Facebook</a>
				<form action="/auth/local" method="POST">
					<label>
						Username: <br />
						<input name="username" />
					</label>
					<br />
					<label>
						Password: <br />
						<input type="password" name="password" />
					</label>
					<br />
					<button>Login</button>
				</form>
		  </div>
		);
	}
}

export default Login;
