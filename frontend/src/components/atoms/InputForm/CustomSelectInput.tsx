import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useFormContext } from 'react-hook-form';

interface CustomSelectInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: string | number;
    registerProps: string;
}

export const CustomSelectInput: React.FC<CustomSelectInputProps> = (props: CustomSelectInputProps) => {
    const { label, value, registerProps } = props;
    const register = useFormContext().register;
    return (
        <Select
            label={label}
            fullWidth
            value={value}
            {...register(registerProps)}
        >
            <MenuItem value={value}></MenuItem>
        </Select>
    )
}