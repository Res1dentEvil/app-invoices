import React, { useEffect } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { Header } from '../Header/Header';
import { Registration } from '../Authorization/Registration';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { NotFound } from '../NotFound/NotFound';
import { Login } from '../Authorization/Login';
import { TaskList } from '../TaskList/TaskList';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { auth } from '../../store/reducers/ActionCreators';
import CreateTask from '../CreateTask/CreateTask';
import { Task } from '../Task/Task';

export const App = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.storeReducer);

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <>
      <Header />
      <main className="main__wrapper">
        {!isAuth ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/task/:id" element={<Task />} />
            {/*<Route path="*" element={<NotFound />} />*/}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>
    </>
  );
};
