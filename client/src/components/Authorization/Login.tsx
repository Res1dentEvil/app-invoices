import React, { useEffect } from 'react';
import './Authorization.scss';
import { Input } from '../UI/Input/Input';
import { login, registration } from '../../store/reducers/ActionCreators';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Formik } from 'formik';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

interface IFormikErrors {
  email: string;
  password: string;
}

export const Login = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.storeReducer);

  return (
    <div className="auth-container">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {} as IFormikErrors;
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = `wrong password`;
          } else if (values.password.length < 3 || values.password.length > 12) {
            errors.password = `wrong password`;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(login(values));
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="form__authorization">
            <h2>
              <LoginIcon />
              Login
            </h2>

            <div className="input__container">
              <Input
                defaultValue={values.email}
                onChange={handleChange}
                type="email"
                placeholder="email"
              />
              <span className={'input__error'}>
                {errors.email && touched.email && errors.email}
              </span>
            </div>

            <div className="input__container">
              <Input
                defaultValue={values.password}
                onChange={handleChange}
                type="password"
                placeholder="password"
              />
              <span className={'input__error'}>
                {errors.password && touched.password && errors.password}
              </span>
            </div>

            <button className="btn btn_registration" type={'submit'}>
              Login
            </button>
            <div>
              <Link className="navbar__link auth-link login" to="/registration">
                <AppRegistrationIcon />
                Registration
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
