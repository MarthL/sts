import { InputAdornment, TextField, TextFieldVariants } from '@mui/material';
import React, { useState } from 'react';

interface TextBlockProps extends React.InputHTMLAttributes<HTMLInputElement> {
    //value: string;
    variant: TextFieldVariants;
    rows: number;
    //maxChar: number;
    //count: string;
    maxChars: number;
}

export const TextBlock: React.FC<TextBlockProps> = (props: TextBlockProps) => {
    const { variant, rows, maxChars } = props;
    const [ charCount, setCharCount ] = useState<number>(0);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const charText = event.target.value;
        setCharCount(charText.length);
    };
  return (
    <TextField
        type={'text'}
        variant={variant}
        multiline
        rows={rows}
        fullWidth
        inputProps={{ maxlength: maxChars }}
        onChange={handleChange}
        InputProps={{ endAdornment: <InputAdornment position="end">{charCount}/{maxChars}</InputAdornment> }}
    />
  );
};