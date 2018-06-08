import React from 'react';

const SignUp = () => (
  <div>
    <h1>Sign Up</h1>
    <form method="POST" action="/auth/signup/create">
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
    <label>
      Email: <br />
      <input name="email" />
    </label>
    <br />
    <button>Submit</button>
    </form>
  </div>
);

export default SignUp;
