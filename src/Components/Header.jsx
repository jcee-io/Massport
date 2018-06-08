import React from 'react';

const NavLeft = props => (
  <ul className="navbar-nav mr-auto">
    <li className="nav-item">
      <a className="nav-link" href="/">Home</a>
    </li>
  </ul>
);

const NavCenter = props => (
  <ul className="brand navbar-nav mx-auto">
    <li className="nav-item">
      <a className="navbar-brand mx-auto" href="/">Massport</a>
    </li>
  </ul>
);

const NavRight = ({ isLoggedIn, user }) => {
  if(isLoggedIn) {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="#">Welcome {user.username}<span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="auth/logout">Logout</a>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/auth/login">Login<span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/auth/signup">Sign Up</a>
        </li>
      </ul>
    );
  }
};

const Header = (props) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <NavLeft />
      <NavCenter />
      <NavRight {...props} />
    </div>
  </nav>
);

export default Header;
