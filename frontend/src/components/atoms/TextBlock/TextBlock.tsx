import { TextField, TextFieldVariants } from '@mui/material';
import React from 'react';

interface TextBlockProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    variant: TextFieldVariants;
    rows: number;
}

export const TextBlock: React.FC<TextBlockProps> = (props: TextBlockProps) => {
    const { value, variant, rows } = props;
  return (
    <TextField
        type={'text'}
        value={value}
        variant={variant}
        multiline
        rows={rows}
    />
  );
};