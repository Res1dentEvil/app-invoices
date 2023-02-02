import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { storeSlice } from '../../store/reducers/StoreSlice';

export const Header = () => {
  const { isAuth } = useAppSelector((state) => state.storeReducer);
  const dispatch = useAppDispatch();

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
          {!isAuth && (
            <Link className="navbar__link navbar__login" to="/login">
              Login
            </Link>
          )}
          {!isAuth && (
            <Link className="navbar__link navbar__registration" to="/registration">
              Registration
            </Link>
          )}
          {isAuth && (
            <Link className="navbar__link navbar__registration" to="/create">
              Create
            </Link>
          )}
          {isAuth && (
            <div
              className="navbar__link navbar__registration"
              onClick={() => dispatch(storeSlice.actions.logout())}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
