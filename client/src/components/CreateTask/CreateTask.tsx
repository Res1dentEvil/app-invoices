import './CreateTask.scss';

import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
  TextField,
} from '@mui/material';
import Select from '@mui/material/Select';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { formatDate } from '../../services/formatingDate';
import { IFileCloudinary, ITask, PaymentStatus } from '../../services/types';
import { getAllTasks, uploadFile } from '../../store/reducers/ActionCreators';
import { storeSlice } from '../../store/reducers/StoreSlice';
import Preloader from '../../assets/Preloader/Preloader';
import { AlertMUI } from '../UI/Alert/AlertMUI';

const CreateTask = () => {
  const dispatch = useAppDispatch();
  const { currentUser, isLoading } = useAppSelector((state) => state.storeReducer);

  const [description, setDescription] = useState('');
  const [section, setSection] = useState('Тваринники');
  const [assigned, setAssigned] = useState('Центр контролю закупок');
  const [priority, setPriority] = useState('Звичайний');
  const [dateEnd, setDateEnd] = useState(formatDate());
  const [file, setFile] = useState<FileList | null>();
  const [errors, setErrors] = useState('');
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(storeSlice.actions.fetchingStart());

    if (!description) {
      setErrors('description field cannot be empty');
      dispatch(storeSlice.actions.fetchingEnd());
      return;
    } else if (!file) {
      setErrors('file field cannot be empty');
      dispatch(storeSlice.actions.fetchingEnd());
      return;
    }

    const task: ITask = {
      owner: currentUser.id,
      description: description,
      assigned: assigned,
      fileLink: file![0],
      // articleImage: URL.createObjectURL(file![0]),
      section: section,
      dateStart: '',
      dateEnd: dateEnd,
      dateUpdate: '',
      priority: priority,
      whoCheckedList: [],
      completed: PaymentStatus.WAITING,
      fileCloudinary: {} as IFileCloudinary,
    };
    await dispatch(uploadFile(task, setIsShowAlert));
    setDescription('');
    setFile(null);
    setErrors('');
    (document.getElementById('form__authorization')! as HTMLFormElement).reset();
    dispatch(getAllTasks(currentUser.roles[0]));
    dispatch(storeSlice.actions.fetchingEnd());
  };

  const handleClose = () => {
    setIsShowAlert(false);
  };

  return (
    <div className="create-container">
      {isLoading && (
        <div className="darkenedDisplay">
          <Preloader />
        </div>
      )}

      <Snackbar open={isShowAlert} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: '#2E7D32',
          }}
        >
          Завдання успішно створене!
        </Alert>
      </Snackbar>

      <form className="form__authorization" id="form__authorization">
        <h2>Створити завдання</h2>

        <div className="input__container">
          <TextField
            label="Тема"
            onChange={(e) => setDescription(e.target.value)}
            size="small"
            value={description}
          />
        </div>

        <div className="input__container">
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Призначено до</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={assigned}
              label="Призначено до"
              onChange={(e) => setAssigned(e.target.value)}
            >
              <MenuItem value={'Центр контролю закупок'}>Центр контролю закупок</MenuItem>
              <MenuItem value={'Виконавчий директор'}>Виконавчий директор</MenuItem>
              <MenuItem value={'Головний бухгалтер'}>Головний бухгалтер</MenuItem>
              <MenuItem value={'Директор по тваринництву'}>Директор по тваринництву</MenuItem>
              <MenuItem value={'Головний інженер'}>Головний інженер</MenuItem>
              <MenuItem value={'Головний вет.лікар'}>Головний вет.лікар</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="input__container">
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Відділ</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={section}
              label="Section"
              onChange={(e) => setSection(e.target.value)}
            >
              <MenuItem value={'Тваринники'}>Тваринники</MenuItem>
              <MenuItem value={'Рослинники'}>Рослинники</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="input__container">
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Пріоритет</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              label="Пріоритет"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value={'Терміновий'}>Терміновий</MenuItem>
              <MenuItem value={'Звичайний'}>Звичайний</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="input__container">
          <TextField
            size="small"
            id="date"
            label="Виконати до"
            type="date"
            defaultValue={formatDate()}
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </div>

        <div className="input__container">
          <input
            className="inputFile"
            type="file"
            name="articleImage"
            onChange={(e) => {
              setFile(e.target.files);
            }}
          />
        </div>

        <div className="errors-message">{errors}</div>

        <Button
          variant="contained"
          className="btn_registration"
          type={'submit'}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Створити
        </Button>
      </form>
    </div>
  );
};

export default CreateTask;
