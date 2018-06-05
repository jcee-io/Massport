import React from 'react';

const SignUp = () => (
  <div>
    <h1>Sign Up</h1>
    <form method="POST" action="/auth/signup/create">
      <input name="username" />
      <input type="password" name="password" />
      <input name="email" />
      <input type="submit" />
    </form>
  </div>
);

export default SignUp;
