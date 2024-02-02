import React from "react";
import { Select } from "@mui/material";
import { useFormContext } from 'react-hook-form';

interface CustomSelectImputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: string;
    registerProps: string;
}

export const CustomSelectInput: React.FC<CustomSelectImputProps> = (props: CustomSelectImputProps) => {
    const { label, value, registerProps } = props;
    const register = useFormContext().register;
    return (
        <Select
            label={label}
            fullWidth
            value={value}
            {...register(registerProps)}
        />
    )
}