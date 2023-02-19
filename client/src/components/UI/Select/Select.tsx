import React from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectProps } from '@mui/material/Select';

interface ISelectProps {
  assigned: string;
  setAssigned: (assigned: string) => void;
  setDisabledBtn: (dis: boolean) => void;
}

export const SelectMUI = <C extends React.ElementType>(props: ISelectProps) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="demo-simple-select-label">Призначити до</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.assigned}
        label="Призначено до"
        onChange={(e) => {
          props.setAssigned(e.target.value);
          props.setDisabledBtn(false);
        }}
      >
        <MenuItem value={'Центр контролю закупок'}>Центр контролю закупок</MenuItem>
        <MenuItem value={'Виконавчий директор'}>Виконавчий директор</MenuItem>
        <MenuItem value={'Головний бухгалтер'}>Головний бухгалтер</MenuItem>
        <MenuItem value={'Директор по тваринництву'}>Директор по тваринництву</MenuItem>
        <MenuItem value={'Головний інженер'}>Головний інженер</MenuItem>
      </Select>
    </FormControl>
  );
};
