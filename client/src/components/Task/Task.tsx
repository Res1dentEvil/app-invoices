import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { editTask, getTask } from '../../store/reducers/ActionCreators';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import Preloader from '../../assets/Preloader';
import './Task.scss';
import { dateDifference, formatingDate } from '../../services/formatingDate';
import { FormControl, Input, InputLabel, MenuItem, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { storeSlice } from '../../store/reducers/StoreSlice';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import { ITask } from '../../services/types';
import { SelectMUI } from '../UI/Select/Select';

export const Task = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentTask } = useAppSelector((state) => state.storeReducer);

  const [assigned, setAssigned] = useState('Центр контролю закупок');
  const [editingAssigned, setEditingAssigned] = useState('Центр контролю закупок');
  const [description, setDescription] = useState<string | null>();
  const [editMode, setEditMode] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [disabledBtnEdit, setDisabledBtnEdit] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(getTask(id));
    }
    setDescription(currentTask.description);
  }, [id, currentTask.description]);

  useEffect(
    () => () => {
      dispatch(storeSlice.actions.setCurrentTask({} as ITask));
    },
    []
  );

  if (!currentTask.description) {
    return <Preloader />;
  }
  return (
    <div className="task">
      <h2 className="task__header">Контроль оплати #{currentTask.counter}</h2>
      <div className="task__body">
        <div className="task__item task__description">
          {!editMode ? (
            <h3>
              {currentTask.description}
              <span className="edit-icon" onClick={() => setEditMode(true)}>
                <DriveFileRenameOutlineIcon style={{ fill: 'cornflowerblue' }} />
              </span>
            </h3>
          ) : (
            <div className="edit-mode-panel">
              <TextField
                defaultValue={currentTask.description}
                onChange={(e) => setDescription(e.target.value)}
                size="small"
              />
              <Button
                size="small"
                variant="contained"
                disabled={false}
                onClick={() => {
                  dispatch(editTask(id!, description!, assigned!));
                  setEditMode(false);
                }}
              >
                <CloudDoneOutlinedIcon style={{ fill: 'white' }} fontSize="medium" />
              </Button>
            </div>
          )}
        </div>

        <div className="task__table">
          <div className="task__table-col left">
            <div className="task__item">Дата створення: </div>
            <div className="task__item">Дата закінчення: </div>
            <div className="task__item">Оновлений: </div>
            <div className="task__item">Узгодив: </div>
            <div className="task__item">Призначений до: </div>
            <div className="task__item">Пріоритет: </div>
          </div>
          <div className="task__table-col">
            <div className="task__item">{formatingDate(currentTask.dateStart)}</div>
            <div className="task__item">{formatingDate(currentTask.dateEnd)}</div>
            <div className="task__item">
              {dateDifference(Date.now(), Date.parse(currentTask.dateUpdate))}
            </div>
            <div className="task__item">
              {currentTask.whoCheckedList.length ? currentTask.whoCheckedList : '-'}
            </div>
            <div className="task__item task__assigned">
              {!editMode ? (
                <>
                  {currentTask.assigned}{' '}
                  <span className="edit-icon" onClick={() => setEditMode(true)}>
                    <DriveFileRenameOutlineIcon style={{ fill: 'cornflowerblue' }} />
                  </span>
                </>
              ) : (
                <>
                  <SelectMUI
                    assigned={editingAssigned}
                    setAssigned={setEditingAssigned}
                    setDisabledBtn={setDisabledBtnEdit}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    disabled={disabledBtnEdit}
                    onClick={() => {
                      dispatch(editTask(id!, description!, editingAssigned!));
                      setEditMode(false);
                    }}
                  >
                    <CloudDoneOutlinedIcon style={{ fill: 'white' }} fontSize="medium" />
                  </Button>
                </>
              )}
            </div>
            <div className="task__item">{currentTask.priority}</div>
          </div>
        </div>

        <a
          className="search-icon-link"
          target="_blank"
          rel="noopener noreferrer"
          href={`/uploads/${currentTask.articleImage}`}
        >
          <FindInPageIcon style={{ fill: 'grey' }} /> Переглянути рахунок
        </a>

        <div className="select__container">
          <SelectMUI
            assigned={assigned}
            setAssigned={setAssigned}
            setDisabledBtn={setDisabledBtn}
          />
          <Button
            style={{ maxWidth: '140px' }}
            variant="contained"
            disabled={disabledBtn}
            onClick={() => {
              dispatch(editTask(id!, description!, assigned!));
            }}
          >
            Застосувати
          </Button>
        </div>
      </div>
    </div>
  );
};
