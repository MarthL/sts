import { TextField, TextFieldVariants } from '@mui/material';
import React from 'react';

interface TextBlockProps extends React.InputHTMLAttributes<HTMLInputElement> {
    //value: string;
    variant: TextFieldVariants;
    rows: number;
    //maxChar: number;
    //count: string;
    maxChars: number;
}

export const TextBlock: React.FC<TextBlockProps> = (props: TextBlockProps) => {
    const { /*value,*/ variant, rows, maxChars/*, count*/ } = props;

  return (
    <TextField
        type={'text'}
        //value={value}
        variant={variant}
        multiline
        rows={rows}
        //InputProps={{endAdornment: <InputAdornment position='end'>{count}</InputAdornment>}}
        fullWidth
        inputProps={{ maxlength: maxChars }}
    />
  );
};