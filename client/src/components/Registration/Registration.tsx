import React from 'react';
import './Registration.scss';
import { Input } from '../UI/Input/Input';
import { registration } from '../../store/reducers/ActionCreators';
import { useAppDispatch } from '../../hooks/redux';
import { Formik } from 'formik';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

interface IFormikErrors {
  email: string;
  password: string;
}

export const Registration = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="container">
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
          } else if (values.password.length < 3 || values.password.length > 3) {
            errors.password = `wrong password`;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(registration(values));
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="form__registration">
            <h2>
              <AppRegistrationIcon />
              Registration
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
              Registration
            </button>
            <div>
              <Link className="navbar__link auth-link login" to="/login">
                <LoginIcon />
                Login
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
