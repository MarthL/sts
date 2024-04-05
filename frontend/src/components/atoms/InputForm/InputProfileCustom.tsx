import React from 'react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';


interface InputProfileCustomProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  value: string | number;
  disabled: boolean;
  registerProps: string;
  onChangeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputProfileCustom: React.FC<InputProfileCustomProps> = (props: InputProfileCustomProps) => {
  const { label, type, value, disabled, registerProps, onChangeEvent } = props;
  const register = useFormContext().register;
  return (
    <TextField
      label={label}
      fullWidth
      type={type}
      value={value}
      disabled={disabled}
      {...register(registerProps)}
      onChange={onChangeEvent}
      sx={{ margin: 'auto' }}
      InputLabelProps={{ shrink: true }}
    />
  );
};