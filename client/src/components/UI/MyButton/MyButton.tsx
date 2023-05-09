import React, { useEffect, useState } from 'react';
import './MyButton.scss';

interface IButtonProps {
  value: string;
  sectionValue: string;
  setSectionValue: (value: string) => void;
}

export const MyButton = ({ value, sectionValue, setSectionValue }: IButtonProps) => {
  return (
    <button
      className={`button ${sectionValue == value && 'chosen-btn'}`}
      onClick={() => {
        if (sectionValue !== value) {
          setSectionValue(value);
        } else {
          setSectionValue('all');
        }
      }}
    >
      {value}
    </button>
  );
};
