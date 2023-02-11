import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createTask } from '../../store/reducers/ActionCreators';
import { ITask } from '../../services/types';
import './CreateTask.scss';
import { Button, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import { formatDate } from '../../services/formatingDate';

const CreateTask = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.storeReducer);

  const [description, setDescription] = useState('');
  const [section, setSection] = useState('Тваринники');
  const [assigned, setAssigned] = useState('Центр контролю закупок');
  const [priority, setPriority] = useState('Звичайний');
  const [dateEnd, setDateEnd] = useState(formatDate());
  const [file, setFile] = useState<FileList | null>();
  const [errors, setErrors] = useState('');

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!description) {
      setErrors('description field cannot be empty');
      return;
    } else if (!file) {
      setErrors('file field cannot be empty');
      return;
    }

    const task: ITask = {
      owner: currentUser.id,
      description: description,
      assigned: assigned,
      articleImage: file![0],
      // articleImage: URL.createObjectURL(file![0]),
      section: section,
      dateStart: '',
      dateEnd: dateEnd,
      dateUpdate: '',
      priority: priority,
      whoCheckedList: [],
      completed: false,
    };
    dispatch(createTask(task));
  };

  return (
    <div className="create-container">
      <form className="form__authorization">
        <h2>Створити завдання</h2>

        <div className="input__container">
          <TextField label="Тема" onChange={(e) => setDescription(e.target.value)} size="small" />
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
        >
          Створити
        </Button>
      </form>
    </div>
  );
};

export default CreateTask;
