import './Header.scss';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/img/logo.png';
import Preloader from '../../assets/Preloader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ManagerPositions } from '../../services/types';
import { getAllTasks } from '../../store/reducers/ActionCreators';
import { storeSlice } from '../../store/reducers/StoreSlice';

export const Header = () => {
  const { isAuth, currentUser } = useAppSelector((state) => state.storeReducer);
  const dispatch = useAppDispatch();

  if (!currentUser.roles) {
    return <Preloader />;
  }

  return (
    <header className="header">
      <div className="navbar">
        <div className="navbar__logo">
          <Link className="navbar__link navbar__logo-name" to="/">
            <img src={Logo} alt="logo" className="logo-img" />
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
              <div className="header__email">{currentUser.roles[0]}</div>
              <div className="header__email">{currentUser.email}</div>
              {currentUser.roles[0] === ManagerPositions.ProcurementControl ||
                (currentUser.roles[0] === 'ADMIN' && (
                  <Link className="navbar__link navbar__registration" to="/create">
                    Створити
                  </Link>
                ))}
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
