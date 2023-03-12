import './App.scss';
import '@fontsource/roboto';

import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { auth } from '../../store/reducers/ActionCreators';
import { Login } from '../Authorization/Login';
import { Registration } from '../Authorization/Registration';
import CreateTask from '../CreateTask/CreateTask';
import { Header } from '../Header/Header';
import { Task } from '../Task/Task';
import { AllTaskList } from '../TaskList/AllTaskList';
import { TasksListByRole } from '../TaskList/TasksListByRole';
// import { Upload } from '../Upload';

export const App = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.storeReducer);

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <>
      {isAuth && <Header />}
      <main className="main__wrapper">
        {!isAuth ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<TasksListByRole />} />
            <Route path="/all" element={<AllTaskList />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/task/:id" element={<Task />} />
            {/*<Route path="upload" element={<Upload />} />*/}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>
    </>
  );
};
