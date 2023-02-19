import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { storeSlice } from '../../store/reducers/StoreSlice';

export const Header = () => {
  const { isAuth, currentUser } = useAppSelector((state) => state.storeReducer);
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="navbar">
        <div className="navbar__logo">
          <Link className="navbar__link navbar__logo-name" to="/">
            LOGO
          </Link>
        </div>
        <div className="navbar__links">
          {!isAuth && (
            <>
              <Link className="navbar__link navbar__login" to="/login">
                Login
              </Link>
              <Link className="navbar__link navbar__registration" to="/registration">
                Registration
              </Link>
            </>
          )}

          {isAuth && (
            <>
              <div className="header__email">{currentUser.email}</div>
              <Link className="navbar__link navbar__registration" to="/create">
                Створити
              </Link>
              <div
                className="navbar__link navbar__registration"
                onClick={() => dispatch(storeSlice.actions.logout())}
              >
                Вийти
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
