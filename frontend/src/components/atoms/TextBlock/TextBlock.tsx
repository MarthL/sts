import { TextField } from '@mui/material';
import React from 'react';

interface TextBlockProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    value: string;
}

export const TextBlock: React.FC<TextBlockProps> = (props: TextBlockProps) => {
    const { type, value } = props;
  return (
    <TextField
        type={type}
        value={value}
    />
  );
};