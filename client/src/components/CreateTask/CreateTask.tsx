import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link, useNavigate } from 'react-router-dom';
import { createTask, registration } from '../../store/reducers/ActionCreators';
import { ITask } from '../../../types';
import './CreateTask.scss';
import { Button, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import Select from '@mui/material/Select';

interface IFormikErrors {
  email: string;
  password: string;
}

const CreateTask = () => {
  const dispatch = useAppDispatch();
  const { isAuth, currentUser } = useAppSelector((state) => state.storeReducer);
  const router = useNavigate();
  const token = localStorage.getItem('token');

  const [description, setDescription] = useState('');
  const [section, setSection] = useState('section');
  const [priority, setPriority] = useState('Low');
  const [file, setFile] = useState<FileList | null>();
  const [errors, setErrors] = useState('');

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!description) {
      setErrors('description field cannot be empty');
      // alert('field description required');
      return;
    } else if (!file) {
      setErrors('file field cannot be empty');
      // alert('field file required');
      return;
    }

    const task: ITask = {
      owner: currentUser.id,
      description: description,
      articleImage: file![0],
      section: section,
      dateStart: '',
      dateEnd: '',
      priority: priority,
      whoCheckedList: [],
      completed: false,
    };
    console.log(`client ${task}`);
    dispatch(createTask(task));
  };

  return (
    <div className="container">
      <form className="form__authorization">
        <h2>CREATE TASK</h2>

        <div className="input__container">
          <TextField label="Description" onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="input__container">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Section</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={section}
              label="Section"
              onChange={(e) => setSection(e.target.value)}
            >
              <MenuItem value={'section'}>section1</MenuItem>
              <MenuItem value={'section2'}>section2</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="input__container">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value={'Low'}>Low</MenuItem>
              <MenuItem value={'High'}>High</MenuItem>
            </Select>
          </FormControl>
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
          Create
        </Button>

        {/*<button className="btn btn_registration" type={'submit'} onClick={handleSubmit}>*/}
        {/*  Create*/}
        {/*</button>*/}
      </form>
    </div>
  );
};

export default CreateTask;
