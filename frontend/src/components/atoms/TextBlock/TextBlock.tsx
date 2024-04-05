import { InputAdornment, TextField, TextFieldVariants } from '@mui/material';
import React, { useState } from 'react';
import './TextBlock.css';

interface TextBlockProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: TextFieldVariants;
  rows: number;
  maxChars: number;
}

export const TextBlock: React.FC<TextBlockProps> = (props: TextBlockProps) => {
  const { variant, rows, maxChars } = props;
  const [charCount, setCharCount] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const charText = event.target.value;
    setCharCount(charText.length);
    setIsError(charText.length >= maxChars)
  };

  return (
    <TextField
      type={'text'}
      variant={variant}
      multiline
      rows={rows}
      fullWidth
      inputProps={{ maxLength: maxChars }}
      onChange={handleChange}
      InputProps={{
        endAdornment:
          <InputAdornment position='end' className={isError ? 'red-text' : ''}>
            {charCount}/{maxChars}
          </InputAdornment>
      }}
    />
  );
};