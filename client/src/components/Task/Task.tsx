import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getTask } from '../../store/reducers/ActionCreators';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import Preloader from '../../assets/Preloader';
import './Task.scss';
import { formatingData } from '../../services/formatingData';

export const Task = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentTask } = useAppSelector((state) => state.storeReducer);

  useEffect(() => {
    if (id) {
      dispatch(getTask(id));
    }
  }, [id]);

  if (!currentTask.description) {
    return <Preloader />;
  }
  return (
    <div className="task">
      <h2 className="task__header">Контроль оплати #{currentTask.counter}</h2>
      <div className="task__body">
        <div className="task__item task__description">
          <h3>{currentTask.description}</h3>
        </div>
        <div className="task__table">
          <div className="task__table-col left">
            <div className="task__item">Дата створення завдання: </div>
            <div className="task__item">Оновлений: </div>
            <div className="task__item">Узгодив: </div>
            <div className="task__item">Призначений до: </div>
            <div className="task__item">Пріоритет: </div>
          </div>
          <div className="task__table-col">
            <div className="task__item">{formatingData(currentTask.dateStart)}</div>
            <div className="task__item">{formatingData(currentTask.dateStart)}</div>
            <div className="task__item">
              {currentTask.whoCheckedList.length ? currentTask.whoCheckedList : '-'}
            </div>
            <div className="task__item">{currentTask.assigned}</div>
            <div className="task__item">{currentTask.priority}</div>
          </div>
        </div>

        <a
          className="search-icon-link"
          target="_blank"
          rel="noopener noreferrer"
          href={`/uploads/${currentTask.articleImage}`}
        >
          <div className="search-icon-link">
            <FindInPageIcon /> Переглянти рахунок
          </div>
        </a>
      </div>
    </div>
  );
};
