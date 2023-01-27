import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div className="navbar">
        <div className="navbar__logo">
          <img src="" alt="" className="navbar__logo-img" />
          <Link className="navbar__link navbar__logo-name" to="/">
            MERN LOGO
          </Link>
        </div>
        <div className="navbar__links">
          <Link className="navbar__link navbar__login" to="/login">
            Login
          </Link>
          <Link className="navbar__link navbar__registration" to="/registration">
            Registration
          </Link>
        </div>
      </div>
    </header>
  );
};
