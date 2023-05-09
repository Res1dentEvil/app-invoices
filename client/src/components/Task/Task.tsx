import './Task.scss';

import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Preloader from '../../assets/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { dateDifference, formatingDate } from '../../services/formatingDate';
import { ITask, ManagerPositions, PaymentStatus } from '../../services/types';
import {
  changeDestination,
  changePaymentStatus,
  deleteFile,
  editTask,
  getAllTasks,
  getTask,
} from '../../store/reducers/ActionCreators';
import { storeSlice } from '../../store/reducers/StoreSlice';
import { SelectMUI } from '../UI/Select/Select';
import { AlertMUI } from '../UI/Alert/AlertMUI';

export const Task = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const route = useNavigate();

  const { currentTask, currentUser } = useAppSelector((state) => state.storeReducer);
  const [assigned, setAssigned] = useState('Центр контролю закупок');
  const [editingAssigned, setEditingAssigned] = useState('Центр контролю закупок');
  const [description, setDescription] = useState<string | null>();
  const [editMode, setEditMode] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [disabledBtnEdit, setDisabledBtnEdit] = useState(true);
  const [error, setError] = useState<{ message: string } | null>();

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

  if (!currentTask.description || !currentUser.roles) {
    return <Preloader />;
  }
  return (
    <div className="task">
      {error?.message && <AlertMUI error={error} setError={setError} />}

      <div className="task__header">
        <h2>
          Контроль оплати #{currentTask.counter} <i>({currentTask.completed})</i>
        </h2>
        {currentUser.roles.includes('ADMIN' || 'MODERATOR') && (
          <DeleteIcon
            className={'icon__delete'}
            style={{ fontSize: 35, fill: '#535557' }}
            onClick={async () => {
              await dispatch(deleteFile(id!, currentTask.fileCloudinary.filename));
              route('/');
            }}
          />
        )}
      </div>
      <div className="task__body">
        <div className="task__item task__description">
          {!editMode ? (
            <h3>
              {currentTask.description}
              {currentUser.roles.includes('ADMIN' || 'MODERATOR') && (
                <span className="edit-icon" onClick={() => setEditMode(true)}>
                  <EditIcon style={{ fill: 'cornflowerblue' }} />
                </span>
              )}
            </h3>
          ) : (
            <div className="edit-mode-panel">
              <TextField
                defaultValue={currentTask.description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDisabledBtnEdit(false);
                }}
                size="small"
              />
              <Button
                size="small"
                variant="contained"
                disabled={disabledBtnEdit}
                onClick={() => {
                  dispatch(editTask(id!, description!, editingAssigned!, setError));
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
              {currentTask.whoCheckedList.length
                ? [...new Set(currentTask.whoCheckedList)].join(', ')
                : '-'}
            </div>
            <div className="task__item task__assigned">
              {!editMode ? (
                <>
                  {currentTask.assigned}
                  {currentUser.roles.includes('ADMIN') && (
                    <span className="edit-icon" onClick={() => setEditMode(true)}>
                      <EditIcon style={{ fill: 'cornflowerblue' }} />
                    </span>
                  )}
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
                      dispatch(editTask(id!, description!, editingAssigned!, setError));
                      setEditMode(false);
                    }}
                  >
                    <CloudDoneOutlinedIcon style={{ fill: 'white' }} fontSize="medium" />
                  </Button>
                </>
              )}
            </div>
            <div
              className={`task__item ${currentTask.priority == 'Терміновий' && 'high-priority'}`}
            >
              {currentTask.priority}
            </div>
          </div>
        </div>

        <a
          className="search-icon-link"
          target="_blank"
          rel="noopener noreferrer"
          // href={`/uploads/${currentTask.articleImage}`}
          href={currentTask.fileLink.toString()}
        >
          <FindInPageIcon style={{ fill: 'grey' }} /> Переглянути рахунок
        </a>
        {!currentUser.roles.includes('MODERATOR') && (
          <div className="select__container">
            <h3>Надіслати до</h3>
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
                dispatch(
                  changeDestination(
                    id!,
                    assigned!,
                    currentUser.roles[0],
                    currentTask.whoCheckedList
                  )
                );
                setDisabledBtn(true);
              }}
            >
              Надіслати
            </Button>
          </div>
        )}
        {(currentUser.roles[0] === 'ADMIN' ||
          currentUser.roles[0] === ManagerPositions.ChiefAccountant) && (
          <div className="accountant-panel">
            <h3>Зміна статусу оплати</h3>
            <div className="accountant-panel__btn-group">
              <Button
                style={{ maxWidth: '140px' }}
                variant="contained"
                color="success"
                disabled={currentTask.completed == PaymentStatus.PAID && true}
                onClick={() => {
                  dispatch(changePaymentStatus(id!, PaymentStatus.PAID));
                }}
              >
                Сплатити
              </Button>
              <Button
                style={{ maxWidth: '140px' }}
                variant="contained"
                color="error"
                disabled={currentTask.completed == PaymentStatus.CANCELED && true}
                onClick={() => {
                  dispatch(changePaymentStatus(id!, PaymentStatus.CANCELED));
                }}
              >
                Відхилити
              </Button>

              <Button
                variant="contained"
                color="primary"
                disabled={currentTask.completed == PaymentStatus.WAITING && true}
                onClick={() => {
                  dispatch(changePaymentStatus(id!, PaymentStatus.WAITING));
                }}
              >
                Повернути в очікування
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
