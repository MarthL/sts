import { TextField, TextFieldVariants } from '@mui/material';
import React from 'react';

interface TextBlockProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    variant: TextFieldVariants;
    minRows: number;
}

export const TextBlock: React.FC<TextBlockProps> = (props: TextBlockProps) => {
    const { value, variant, minRows } = props;
  return (
    <TextField
        type={'text'}
        value={value}
        variant={variant}
        multiline
        minRows={minRows}
    />
  );
};