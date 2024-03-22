import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextBlockProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    value: string;
    registerProps: string;
    onChangeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextBlock: React.FC<TextBlockProps> = (props: TextBlockProps) => {
    const { type, value, registerProps, onChangeEvent } = props;
    const register = useFormContext().register;
  return (
    <>
        <TextBlock
            registerProps={registerProps}
            onChangeEvent={onChangeEvent}
            //onChange={onChangeEvent}
            type={type}
            value={value}
            {...register(registerProps)}            
        />
    </>
  );
};
