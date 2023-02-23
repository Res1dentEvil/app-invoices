import './Input.scss';

import React from 'react';

interface inputProps {
  defaultValue?: string;
  onChange?: {
    (e: React.ChangeEvent): void;
    <T = string | React.ChangeEvent>(field: T): T extends React.ChangeEvent
      ? void
      : (e: string | React.ChangeEvent) => void;
  };
  type: string;
  placeholder: string;
}

export const Input = ({ type, placeholder, defaultValue, onChange }: inputProps) => {
  return (
    <input
      className="input"
      id={placeholder}
      onChange={onChange}
      value={defaultValue}
      type={type}
      placeholder={placeholder}
    />
  );
};
